from fastapi import APIRouter, HTTPException
from app.schemas.product import ProductList
from app.schemas.batch import Batch
from app.schemas.message import Message
from app.utils.helpers import generate_batch, create_query_for_insert
from app.utils.helpers import create_query_for_delete, generate_id
from datetime import date
from app.db.DB_Manager import Database

router = APIRouter()
table_products = 'products'
table_batches = 'batches'


@router.post('/products', response_model=Batch)
def created_products(products: ProductList):
    count: int = 0
    total: int = 0

    batch_id: str = generate_batch()

    new_batch: dict = {
        'id': batch_id,
        'created_at': date.today(),
        'updated_at': date.today(),
    }

    db = Database()
    db.connect()

    try:
        db.connection.start_transaction()
        q_batch, v_batch = create_query_for_insert(table_batches, **new_batch)
        db.cursor.execute(q_batch, v_batch)

        total = len(products.products)

        for product in products.products:
            new_product = product.model_dump()
            new_product['batch_id'] = batch_id
            new_product['id'] = generate_id()
            new_product['status'] = 'pendiente'
            new_product['created_at'] = date.today()
            new_product['updated_at'] = date.today()
            q_product, v_product = create_query_for_insert(
                table_products, **new_product)
            db.cursor.execute(q_product, v_product)
            count += 1
        db.connection.commit()
        return {'batch': batch_id, 'total_products': f'{count} to {total}'}
    except Exception as e:
        if db.connection:
            db.connection.rollback()
        raise HTTPException(
            status_code=500, detail=f'Error {e}')
    finally:
        db.disconnect()


@router.delete('/products/{batch_id}', response_model=Message)
def products_delete(batch_id: str):

    db = Database()
    db.connect()
    try:
        db.connection.start_transaction()
        'Delete products for batches'
        q_products, v_products = create_query_for_delete(
            table_products, batch_id=batch_id)
        db.cursor.execute(q_products, v_products)

        'Delete bacth id'
        q_batches, v_batches = create_query_for_delete(
            table_batches, id=batch_id)
        db.cursor.execute(q_batches, v_batches)
        db.connection.commit()
        return {'message': 'Batch and associated products deleted successfully.'}
    except Exception as e:
        if db.connection:
            db.connection.rollback()
        raise HTTPException(
            status_code=500,
            detail=f'Error deleting batch and products: {e}'
        )
    finally:
        db.disconnect()

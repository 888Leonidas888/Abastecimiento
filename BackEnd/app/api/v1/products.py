from fastapi import APIRouter, HTTPException
from app.schemas.product import ProductList
from app.schemas.batch import Batch
from app.schemas.message import Message
from app.utils.helpers import generate_batch, generate_id
from datetime import date
from app.db.DB_Manager import Database

router = APIRouter()


@router.post('/products', response_model=Batch)
def created_products(products: ProductList):
    count: int = 0
    table_products: str = 'products'
    batch_id: str = generate_batch()

    new_batch: dict = {
        'id': batch_id,
        'created_at': date.today(),
        'updated_at': date.today(),
    }

    db = Database()
    db.connect()

    try:
        db.create('batches', **new_batch)

        for product in products.products:
            new_product = product.model_dump()
            new_product['batch_id'] = batch_id
            new_product['id'] = generate_id()
            new_product['status'] = 'pendiente'
            new_product['created_at'] = date.today()
            new_product['updated_at'] = date.today()

            db.create(table_products, **new_product)
            count += 1
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f'Error inserting products: {e}')
    finally:
        db.disconnect()
    return {'batch': batch_id, 'total_products': count}


@router.delete('/products/{batch_id}', response_model=Message)
def products_delete(batch_id: str):

    db = Database()
    db.connect()
    try:
        result = db.read('batches', id=batch_id)

        if len(result) == 0:
            raise HTTPException(status_code=404,
                                detail=f'{batch_id} not found')

        'Delete products for batches'
        db.delete('products', batch_id=batch_id)

        'Delete bacth id'
        db.delete('batches', id=batch_id)

        return {'message': 'Batch and associated products deleted successfully.'}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f'Error deleting batch and products: {e}'
        )
    finally:
        db.disconnect()

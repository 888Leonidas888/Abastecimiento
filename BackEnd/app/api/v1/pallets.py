from fastapi import APIRouter, HTTPException
from typing import Optional, Literal
from app.db.DB_Manager import Database
from app.schemas.product import UpdateProduct, PalletsList
from app.schemas.message import Message
from app.utils.helpers import create_query_for_update, create_query_for_insert
from datetime import date

router = APIRouter()

table_products = 'products'
table_productivity = 'productivity'


@router.get('/pallets', response_model=PalletsList)
def get_pallets(qr_pallet: Optional[str] = None, status: Literal['pendiente', 'error', 'completado', 'proceso'] = None):

    db = Database()
    db.connect()

    has_pallet: dict = {}

    if qr_pallet:
        has_pallet['qr_pallet'] = qr_pallet
    if status:
        has_pallet['status'] = status

    try:
        if has_pallet:
            pallet = db.read(table_products, **has_pallet)
            if len(pallet) == 0:
                raise HTTPException(status_code=404,
                                    detail=f'QRPallet {qr_pallet} not found')
            return {'pallets': pallet}
        else:
            pallets = db.read_all(table_products)
            return {'pallets': pallets}
    finally:
        db.disconnect()


@router.put('/pallets', response_model=Message)
def update_pallet(qr_pallet: str, pallet_update: UpdateProduct):

    db = Database()
    db.connect()

    update_product = pallet_update.model_dump()

    filter_params_pallet = {
        'qr_pallet': qr_pallet
    }

    status_product = {
        'status': update_product['status']
    }

    user_productivity = {
        'id_user': update_product['id_user'],
        'qr_pallet': qr_pallet,
        'created_at': date.today()
    }

    try:
        db.connection.start_transaction()

        'update products for qr_pallet'
        q_pallet, v_pallet = create_query_for_update(
            table_products,
            filter_params_pallet,
            **status_product)
        db.cursor.execute(q_pallet, v_pallet)

        'insert productivity of user'
        q_productivity, v_productivity = create_query_for_insert(
            table_productivity, **user_productivity)
        db.cursor.execute(q_productivity, v_productivity)
        db.connection.commit()

        return {'message': f'Pallet with code QR {qr_pallet} updated.'}
    except Exception as e:
        if db.connection:
            db.connection.rollback()
        raise HTTPException(status_code=500, detail=f'Error {e}')
    finally:
        db.disconnect()

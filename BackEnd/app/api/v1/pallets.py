from fastapi import APIRouter, HTTPException
from typing import Optional, Literal
from app.db.DB_Manager import Database
from app.schemas.product import UpdateProduct, PalletsList
from app.schemas.message import Message

router = APIRouter()

table = 'products'


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
            pallet = db.read(table, **has_pallet)
            if len(pallet) == 0:
                raise HTTPException(status_code=404,
                                    detail=f'QRPallet {qr_pallet} not found')
            return {'pallets': pallet}
        else:
            pallets = db.read_all(table)
            return {'pallets': pallets}
    finally:
        db.disconnect()


@router.put('/pallets', response_model=Message)
def update_pallet(qr_pallet: str, pallet_update: UpdateProduct):
    db = Database()
    db.connect()
    try:
        if qr_pallet:
            pallet = db.read(table, qr_pallet=qr_pallet)
            if len(pallet) == 0:
                raise HTTPException(status_code=404,
                                    detail=f'QRPallet {qr_pallet} not found')
            filter_params: dict = {
                'qr_pallet': qr_pallet
            }
            pallet_status_update = pallet_update.model_dump()
            db.update(table, filter_params, **pallet_status_update)
            return {'message': f'Pallet with code QR {qr_pallet} update.'}
    finally:
        db.disconnect()

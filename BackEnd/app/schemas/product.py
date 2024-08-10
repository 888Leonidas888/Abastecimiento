from pydantic import BaseModel
from typing import List, Literal
from datetime import date


class Product(BaseModel):
    sku: int
    description: str
    origin: str
    destination: str
    due_date: date
    freshness: str
    qr_pallet: str


class ProductList(BaseModel):
    products: List[Product]


class CreatedProducts(Product):
    id: str
    status: str
    batch: str
    created_date: date
    update_date: date


class UpdateProduct(BaseModel):
    status: Literal['proceso', 'error', 'completado']
    id_user: str


class Pallet(BaseModel):
    id: str
    batch_id: str
    sku: int
    description: str
    origin: str
    destination: str
    status: str
    due_date: date
    freshness: str
    qr_pallet: str
    created_at: date
    updated_at: date


class PalletsList(BaseModel):
    pallets: List[Pallet]

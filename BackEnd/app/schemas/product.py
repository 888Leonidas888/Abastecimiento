from pydantic import BaseModel
from typing import List
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


# class UpdateProducts(BaseModel):
#     status: str

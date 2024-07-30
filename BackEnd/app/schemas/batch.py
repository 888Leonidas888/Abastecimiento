from pydantic import BaseModel


class Batch(BaseModel):
    batch: str
    total_products: str

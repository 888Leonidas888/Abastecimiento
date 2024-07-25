from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    dni: str
    user: str
    name_user: str
    last_name_user: str
    permission: str


class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    password: Optional[str] = None
    name_user: Optional[str] = None
    last_name_user: Optional[str] = None
    permission: Optional[str] = None

class User(UserBase):
    id: str
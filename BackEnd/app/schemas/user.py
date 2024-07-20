from pydantic import BaseModel


class UserBase(BaseModel):
    dni: str
    user: str
    name_user: str
    last_name: str
    permission: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: str

from pydantic import BaseModel
from typing import List, Literal

class TokenResponse(BaseModel):
    access_token: str
    permission: Literal['operador', 'administrador']
    user: str
    id_user: str
    token_time: str

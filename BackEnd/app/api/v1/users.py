from fastapi import APIRouter, HTTPException
from app.schemas.user import User, UserCreate
from typing import List, Dict, Optional, Union
from app.utils.helpers import generate_id

router = APIRouter()

users = [
    {
        "id": "kIJ859KINH",
        "dni": "12345678A",
        "user": "user1",
        "password": "password1",
        "name_user": "John",
        "last_name": "Doe",
        "permission": "administrador"
    },
    {
        "id": "JUG528454",
        "dni": "23456789B",
        "user": "user2",
        "password": "password2",
        "name_user": "Jane",
        "last_name": "Smith",
        "permission": "usuario"
    },
]


@router.get("/users", response_model=Union[Dict[str, List[User]], Dict[str, User]])
def read_users(dni: Optional[str] = None):
    if dni:
        # conectar
        db_user = next((user for user in users if user["dni"] == dni), None)

        if not db_user:
            raise HTTPException(status_code=404, detail='User not found')
        return {'user': db_user}
    else:
        return {'users': users}


@router.post('/users', response_model=User)
def create_user(user: UserCreate):
    permissions_valid = ['administrador', 'operador']
    new_id = generate_id()
    new_user = user.model_dump()
    permission = new_user['permission']
    new_user['id'] = new_id
    if permission not in permissions_valid:
        raise HTTPException(status_code=400,
                            detail=f'permision {permission} invalid')
    users.append(new_user)
    return new_user


@router.delete('/users/{dni}', response_model=Dict[str, str])
def delete_user(dni: str):
    global users
    user_to_delete = next((user for user in users if user["dni"] == dni), None)

    if not user_to_delete:
        raise HTTPException(status_code=404, detail='User not found')

    users = [user for user in users if user['dni'] != dni]
    return {'message': 'User delete'}

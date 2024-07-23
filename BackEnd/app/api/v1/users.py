from fastapi import APIRouter, HTTPException
from app.schemas.user import User, UserCreate, UserUpdate
from typing import List, Dict, Optional, Union
from app.utils.helpers import generate_id
from app.db.DB_Manager import Database
from datetime import date

router = APIRouter()

permissions_valid = ['administrador', 'operador']

@router.get("/users", response_model=Union[Dict[str, List[User]], Dict[str, User]])
def read_users(dni: Optional[str] = None, user: Optional[str] = None):
    params = {'dni': dni, 'user': user}
    if dni:
        database = Database()
        database.connect()
        result = database.read('users', **params)
        keys_to_remove = ['updated_at', 'created_at', 'password']
        structured_data = map(lambda x: {key: value for key, value in x.items() if key not in keys_to_remove}, result)
        structured_data = list(structured_data)
        database.disconnect()

        if not result:
            raise HTTPException(status_code=404, detail='User not found')
        return {'user': structured_data}
    else:
        database = Database()
        database.connect()
        result = database.read_all('users')
        keys_to_remove = ['updated_at', 'created_at', 'password']
        structured_data = map(lambda x: {key: value for key, value in x.items() if key not in keys_to_remove}, result)
        structured_data = list(structured_data)
        database.disconnect()
        return {'users': structured_data}


@router.post('/users', response_model=User)
def create_user(user: UserCreate):

    new_id = generate_id()
    new_user = user.model_dump()
    permission = new_user['permission']
    new_user['id'] = new_id
    new_user['created_at'] = date.today()
    new_user['updated_at'] = date.today()
    if permission not in permissions_valid:
        raise HTTPException(status_code=400,
                            detail=f'Permision {permission} invalid')
    database = Database()
    database.connect()
    database.create('users', **new_user)
    database.disconnect()
    return new_user


@router.delete('/users/{dni}', response_model=Dict[str, str])
def delete_user(dni: str):
    global users
    user_to_delete = next((user for user in users if user["dni"] == dni), None)

    if not user_to_delete:
        raise HTTPException(status_code=404, detail='User not found')

    users = [user for user in users if user['dni'] != dni]
    return {'message': 'User delete'}


@router.put('/users/{dni}', response_model=User)
def update_user(dni: str, user_update: UserUpdate):
    global users

    user_to_update = next((user for user in users if user['dni'] == dni), None)

    if not user_to_update:
        raise HTTPException(status_code=404, detail='User not found')

    if user_update.permission and user_update.permission not in permissions_valid:
        raise HTTPException(status_code=400,
                            detail=f'Permision {user_update.permission} invalid')

    user_to_update.update(user_update.model_dump(exclude_unset=True))
    return user_to_update

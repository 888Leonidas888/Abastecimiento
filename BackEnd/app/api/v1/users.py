from fastapi import APIRouter, HTTPException
from app.schemas.user import User, UserCreate, UserUpdate
from typing import List, Dict, Optional, Union
from app.utils.helpers import generate_id
from app.db.DB_Manager import Database
from datetime import date

router = APIRouter()

permissions_valid = ['administrador', 'operador']

@router.get("/users", response_model=Union[Dict[str, List[User]], Dict[str, User]])
def read_users(dni: Optional[str] = None):
    params = {'dni': dni}
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
    if not dni:
        raise HTTPException(status_code=404, detail='User not found')
    params = {'dni': dni}
    database = Database()
    database.connect()
    database.delete('users', **params)
    database.disconnect()
    return {'message': f'User identified with {dni} was deleted successfully'}


@router.put('/users/{dni}')
def update_user(dni: str, user_update: UserUpdate):
    if not dni:
        raise HTTPException(status_code=404, detail='User not found')
    params = {'dni': dni}
    database = Database()
    database.connect()
    
    result = database.read('users', **params)

    if not result:
        database.disconnect()
        raise HTTPException(status_code=404, detail='User not found')
    keys_to_remove = ['updated_at', 'created_at', 'password']
    user_to_update = {key: value for key, value in result[0].items() if key not in keys_to_remove}
    updated_user = user_update.model_dump(exclude_unset=True)
    updated_user_permission = updated_user['permission']
    if updated_user_permission not in permissions_valid:
        database.disconnect()
        raise HTTPException(status_code=400,
                            detail=f'Permision {updated_user_permission} invalid')
    
    updated_user['updated_at'] = date.today()
    database.update('users', user_to_update, **updated_user)
    # No longer required as a response. Omitted....
    """result = database.read('users', **params)
    keys_to_remove = ['updated_at', 'created_at', 'password']
    structured_data = map(lambda x: {key: value for key, value in x.items() if key not in keys_to_remove}, result)
    structured_data = list(structured_data)
    """
    database.disconnect()
    return {'message': f'User identified with {dni} was updated successfully'}

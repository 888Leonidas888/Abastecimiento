from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.endpoint import EndPoint
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from app.oauth.token_manager import *
from app.api.v1.users import router as router_users
from app.api.v1.products import router as router_products
from app.api.v1.pallets import router as router_pallets
from app.schemas.tokenResponse import TokenResponse

app = FastAPI()

app.title = 'API para el abastecimiento'
app.version = 'v0.0.1'

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos
    allow_headers=["*"],  # Permitir todos los encabezados
)


@app.post('/token', response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = auth_user('users', form_data.username, form_data.password)
    # Check if user is correct
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expire = timedelta(hours=8)
    access_token_JWT = create_token({"sub": user['user']}, access_token_expire)
    # Data from form. TESTING PURPORSES
    print(form_data.username, form_data.password)
    # RETURN JSON WITH THE ACCESS TOKEN
    return {
        "access_token": access_token_JWT,
        "token_time": "bearer",
        "permission": user['permission'],
        "user": user['user'],
        "id_user": user['id']
    }


@app.get('/', response_model=EndPoint, tags=['home'])
def home():
    return {'end_point': ['http://127.0.0.1:8000/api/v1/users',
                          'http://127.0.0.1:8000/api/v1/products',
                          'http://127.0.0.1:8000/api/v1/pallets']}


app.include_router(router_users, prefix='/api/v1',
                   tags=['users'], dependencies=[Depends(get_admin_user)])
app.include_router(router_products, prefix='/api/v1', tags=['products'])
app.include_router(router_pallets, prefix='/api/v1', tags=['pallets'])

# 
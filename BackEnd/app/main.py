from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.endpoint import EndPoint
from app.api.v1.users import router as router_users
from app.api.v1.products import router as router_products
from app.api.v1.pallets import router as router_pallets


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


@app.get('/', response_model=EndPoint, tags=['home'])
def home():
    return {'end_point': ['http://127.0.0.1:8000/api/v1/users',
                          'http://127.0.0.1:8000/api/v1/products',
                          'http://127.0.0.1:8000/api/v1/pallets']}


app.include_router(router_users, prefix='/api/v1', tags=['users'])
app.include_router(router_products, prefix='/api/v1', tags=['products'])
app.include_router(router_pallets, prefix='/api/v1', tags=['pallets'])

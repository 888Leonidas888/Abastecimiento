from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.users import router as router_users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos
    allow_headers=["*"],  # Permitir todos los encabezados
)

app.include_router(router_users, prefix='/api/v1', tags=['users'])


@app.get('/')
def home():
    return {'message': 'Hello world!'}

from fastapi import FastAPI
from app.api.v1.users import router as router_users

app = FastAPI()

app.include_router(router_users, prefix='/api/v1', tags=['users'])


@app.get('/')
def home():
    return {'message': 'Hello world!'}

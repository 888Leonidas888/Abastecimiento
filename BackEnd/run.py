import uvicorn

if __name__ == '__main__':
    uvicorn.run('app.main:app', port=8000, host="localhost", reload=True)

# Abastecimiento de productos para almacenes
![Static Badge](https://img.shields.io/badge/Python-3.12-eeeeee?logo=python&logoColor=ffff99) ![Static Badge](https://img.shields.io/badge/FastApi-0.111-74C69B?logo=fastapi&logoColor=74C69B) ![Static Badge]( https://img.shields.io/badge/npm-10.5.2-red?logo=npm) ![Static Badge]( https://img.shields.io/badge/node-20.13.1-blue?logo=nodedotjs) ![Static Badge]( https://img.shields.io/badge/MySQL-8.0.30-blue?logo=mysql&logoColor=white)



![Montacargas eléctrico abasteciento](https://static4.depositphotos.com/1000291/324/i/950/depositphotos_3247657-stock-photo-distribution-in-warehouse-with-forklift.jpg)

Este sistema busca reemplazar el proceso manual de abastecimiento. Es ideal para almacenes donde el proceso de abastecimiento es cotidiano.

## Descripción

El proceso es muy sencillo y consta de los siguientes pasos:

- **Cargar productos**: que se tengan por abastecer mediante la app.
- **Solicitar productos**: para abastecer mediante el app.

La intención es que el proceso de abastecimiento esté controlado por esta app y no se tenga que recurrir a procesos manuales.

## FrontEnd y BackEnd


Este proyecto esta divido, para activar cada lado de la aplicación siga las indicaciones.

## Instalación y ejecución

### Clonar el Repositorio

Para instalar este proyecto, comience clonando el repositorio desde se terminal:

```sh
git clone https://github.com/888Leonidas888/Abastecimiento.git
```

### Backend

#### Cree su entorno virtual

Ahora cree su entorno virtual e instale las dependencias para este proyecto.

```sh
cd Abastecimiento
python -m venv mi_entorno_virtual
source mi_entorno_virtual/bin/activate #en windows use: mi_entorno_virtual\Scripts\activate
cd Backend/
pip install -r requirements.txt
```

#### Ejecutar el Backend

Ahora ejecute:

```sh
python run.py
```

### Frontend

#### Instalar dependencias

Siga los siguientes comandos:

```js
cd FrontEnd
npm install
```

#### Ejecutar el Frontend

Ahora ejecute:

```js
npx nodemon app.js
```


## Endpoint y documentación

Acceda a los endpoint.

### Usuarios

+ `GET /api/v1/users`: Obtener la lista de usuarios.
+ `POST /api/v1/users`: Crear un nuevo usuario.
+ `GET /api/v1/users/{dni}`: Obtener un usuario por su DNI.
+ `PUT /api/v1/users/{dni}`: Actualizar un usuario por su DNI.
+ `DELETE /api/v1/users/{dni}`: Eliminar un usuario por su DNI.

### Productos

+ `POST /api/v1/products`: Crear una lista de productos.
+ `DELETE /api/v1/products`: Eliminar una lista de productos.

### Pallets

+ `GET /api/v1/pallets`: Obtener una lista de productos.
+ `GET /api/v1/pallets/{qr_pallet}`: Obtener un producto.
+ `PUT /api/v1/pallets/{qr_pallet}`: Obtener un producto.

Visite la documentación de la API y aprenda como interactuar con ella en la siguiente ruta:

+ [Documentación de la API de abastecimiento](http://localhost:8000/docs)

## Estructura del Proyecto

```sh
Abastecimiento/
├── Backend/
│   ├── app/
|   |   ├──api
|   |   |   └── v1/   
|   |   |       ├── users.py
│   │   |       ├── products.py
│   │   |       └── pallets.py
|   |   |
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── db/
│   │   ├── oauth/
│   │   ├── schemas/
│   │   └── utils/
|   │
│   ├── run.py/
│   └── requirements.txt
└── Frontend/
    ├── public/
    |   ├── css/
    │   ├── img/
    │   └── js/
    ├── views/
    |   ├── css/
    │   ├── img/
    │   └── js/
    ├── app.js  
    └── package.json

```

# Abastecimiento de productos para almacenes
![Static Badge](https://img.shields.io/badge/Python-3.12-eeeeee?logo=python&logoColor=ffff99) ![Static Badge](https://img.shields.io/badge/FastApi-0.111-74C69B?logo=fastapi&logoColor=74C69B)

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

En desarrollo

## Endpoint y documentación

Acceda a los endpoint.

### Usuarios

+ `GET /api/v1/users`: Obtener la lista de usuarios.
+ `POST /api/v1/users`: Crear un nuevo usuario.
+ `GET /api/v1/users/{dni}`: Obtener un usuario por su DNI.
+ `PUT /api/v1/users/{dni}`: Actualizar un usuario por su DNI.
+ `DELETE /api/v1/users/{dni}`: Eliminar un usuario por su DNI.

### Productos
### Pallets

> [!NOTE]
> Solo el primer endpoint esta activo, los otros 2 estan en construcción.

Visite la documentación de la API y aprenda como interactuar con ella en la siguiente ruta:

+ [Documentación de la API](http://localhost:8000/docs)

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
│   │   ├── main.py
│   │   ├── schemas/
│   │   ├── db/
│   │   └── utils/
|   │
│   ├── run.py/
│   └── requirements.txt
└── Frontend/ (pendiente)
```


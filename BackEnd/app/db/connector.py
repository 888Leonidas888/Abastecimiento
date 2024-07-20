import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
from os import getenv

# Loading the enviroment variable
load_dotenv()

# Connection to the database
def connect():
    try:
        connection = mysql.connector.connect(
            host=f"{getenv('SALMON_HOST_DEV')}",
            user=f"{getenv('SALMON_USER_DEV')}",
            password=f"{getenv('SALMON_USER_PASS_DEV')}",
            database=f"{getenv('SALMON_DATABASE_DEV')}"
        )
        if connection.is_connected():
            cursor = connection.cursor()
            return connection, cursor

    except Error as e:
        raise e

# For closing the cursor and the connection 
def disconnect(connection, cursor):
    cursor.close()
    connection.close()

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
            host='localhost',
            user='salmon_user',
            password=f"{getenv('SALMON_USER_PASS')}",
            database='Salmon_DB'
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

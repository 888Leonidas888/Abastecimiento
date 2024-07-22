import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
from os import getenv

# Loading the enviroment variable
load_dotenv()

# Connection to the database
class Database:
    def __init__(self):
        # Setting up the configuration of the DB upon initialization
        self.connection = None
        self.cursor = None
        self.db_config = {
            'host': getenv('SALMON_HOST_DEV'),
            'user': getenv('SALMON_USER_DEV'),
            'password': getenv('SALMON_USER_PASS_DEV'),
            'database': getenv('SALMON_DATABASE_DEV')
        }

    def connect(self):
        # Method for connecting to the DB established on the constructor
        try:
            self.connection = mysql.connector.connect(**self.db_config)
            if self.connection.is_connected():
                # The cursor no longer returns data in tuple, now it does on dictionary
                self.cursor = self.connection.cursor(dictionary=True)
                print("Successfully connected.")
        except Error as e:
            raise (f"Error connecting to database: {e}")

    def disconnect(self):
        # Method for disconnecting to the DB established on the constructor
        if self.cursor and self.connection:
            self.cursor.close()
            self.connection.close()
            print("Successfully disconnected.")

    def create(self, table_name, **kwargs):
        """Method for creating a registry on the DB

            Usage: instance_name.create(table_name, **kwargs)

            {
                table_name: str - Name of the table of the DB -
                kwargs: dict - For retreiving the keys and values using them as 
                arguments for the query -            
            }
        
        """
         
        columns = ', '.join(kwargs.keys())
        values = ', '.join(['%s'] * len(kwargs))
        query = f"INSERT INTO {table_name} ({columns}) VALUES ({values})"
        try:
            # Replacing placeholders
            self.cursor.execute(query, tuple(kwargs.values()))
            self.connection.commit()
            print("Record inserted successfully.")
        except Error as e:
            self.connection.rollback()
            print(f"Error inserting record: {e}")

    def read(self, table_name, **kwargs):
        """Method for reading a table with conditions on the DB

            Usage: instance_name.read(table_name, **kwargs)

            {
                table_name: str - Name of the table of the DB -
                kwargs: dict - For retreiving the keys and values using them as 
                arguments for the query -            
            }
        
        """ 
        condition = ' AND '.join([f"{key}=%s" for key in kwargs])
        query = f"SELECT * FROM {table_name} WHERE {condition}"
        try:
            # Replacing placeholders
            self.cursor.execute(query, tuple(kwargs.values()))
            result = self.cursor.fetchall()
            return result
        except Error as e:
            print(f"Error reading records: {e}")

    def read_all(self, table_name):
        """Method for reading all registries on a table of the DB

            Usage: instance_name.read_all(table_name)

            {
                table_name: str - Name of the table of the DB -          
            }
        
        """ 
        query = f"SELECT * FROM {table_name}"
        try:
            self.cursor.execute(query)
            result = self.cursor.fetchall()
            return result
        except Error as e:
            print(f"Error reading records: {e}")

    def update(self, table_name, filter_params, **update_params):
        """Method for updating a registry on the DB

            Usage: instance_name.update(table_name, filter_params, **update_params)

            {
                table_name: str - Name of the table of the DB -
                filter_params : dict - For retreiving the keys and values using them as 
                a filter for the query -
                update_params : dict - For retreiving the keys and values that will be updated on a record -         
            }
        
        """
        update_declaration = ', '.join([f"{key}=%s" for key in update_params])
        filter_declaration = ' AND '.join([f"{key}=%s" for key in filter_params])
        query = f"UPDATE {table_name} SET {update_declaration} WHERE {filter_declaration}"
        try:
            # Replacing placeholders
            self.cursor.execute(query, tuple(update_params.values()) + tuple(filter_params.values()))
            self.connection.commit()
            print("Record updated successfully.")
        except Error as e:
            self.connection.rollback()
            print(f"Error updating record: {e}")

    def delete(self, table_name, **kwargs):
        """Method for deleting a registry on the DB

            Usage: instance_name.delete(table_name, **kwargs)

            {
                table_name: str - Name of the table of the DB -
                kwargs: dict - For retreiving the keys and values using them as 
                arguments for the query -            
            }
        
        """ 
        condition = ' AND '.join([f"{key}=%s" for key in kwargs])
        query = f"DELETE FROM {table_name} WHERE {condition}"
        try:
            # Replacing placeholders
            self.cursor.execute(query, tuple(kwargs.values()))
            self.connection.commit()
            print("Record deleted successfully.")
        except Error as e:
            self.connection.rollback()
            print(f"Error deleting record: {e}")
import uuid
import random
from datetime import date


def generate_id() -> str:
    """Generates a unique UUID."""
    return str(uuid.uuid4())


def generate_num8_digit() -> int:
    "Generates a random 8-digit number."
    return random.randint(10000000, 99999999)


def generate_batch() -> str:
    """Generates a batch ID using the current date and a UUID."""
    current_date_str: str = str(date.today()).replace('-', '')
    unique_id: str = generate_id()
    return f'{current_date_str}-{unique_id}'


def create_query_for_insert(table_name: str, **kwargs) -> tuple[str, tuple]:
    """Generates an SQL insert command and its values."""
    columns = ', '.join(kwargs.keys())
    values = ', '.join(['%s'] * len(kwargs))
    query = f"INSERT INTO {table_name} ({columns}) VALUES ({values})"
    return query, tuple(kwargs.values())


def create_query_for_delete(table_name, **kwargs) -> tuple[str, tuple]:
    """Generates a delete SQL command and its values."""
    condition = ' AND '.join([f"{key}=%s" for key in kwargs])
    query = f"DELETE FROM {table_name} WHERE {condition}"
    return query, tuple(kwargs.values())


def create_query_for_update(table_name, filter_params, **update_params) -> tuple[str, tuple]:
    """Generates a update SQL command and its values."""
    update_declaration = ', '.join([f"{key}=%s" for key in update_params])
    filter_declaration = ' AND '.join([f"{key}=%s" for key in filter_params])
    query = f"UPDATE {table_name} SET {
        update_declaration} WHERE {filter_declaration}"
    return query, tuple(update_params.values()) + tuple(filter_params.values())

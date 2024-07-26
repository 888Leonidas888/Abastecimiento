import uuid
import random
from datetime import date


def generate_id() -> str:
    """Genera un UUID único."""
    return str(uuid.uuid4())


def generate_num8_digit() -> int:
    """Genera un número aleatorio de 8 dígitos."""
    return random.randint(10000000, 99999999)


def generate_batch() -> str:
    """Genera un ID de lote usando la fecha actual y un UUID."""
    current_date_str: str = str(date.today()).replace('-', '')
    unique_id: str = generate_id()
    return f'{current_date_str}-{unique_id}'

import uuid
import random


def generate_id():
    return str(uuid.uuid4())

def generate_num8_digit():
    return random.randint(10000000, 99999999)
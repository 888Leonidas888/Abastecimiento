from pydantic import BaseModel


class EndPoint(BaseModel):
    end_point: list[str]

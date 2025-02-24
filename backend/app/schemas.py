from pydantic import BaseModel

class PlayerScheme(BaseModel):
    name: str
    location: str
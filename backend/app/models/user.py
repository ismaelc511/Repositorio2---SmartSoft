from typing import Optional
from pydantic import BaseModel, Field, EmailStr

class User(BaseModel):
    id: Optional[str]
    name: str = Field(default=None)
    email: EmailStr = Field(default= None)
    password: str = Field(default=None)
    class Config:
        the_schema = {
            "user_demo":{
                "name": "Bek",
                "email":"help@bekbrace.com",
                "password":"123"
            }
        }

class UserLoginSchema(BaseModel):
    email: EmailStr = Field(default= None)
    password: str = Field(default=None)
    class Config:
        schema_extra = {
            "user_demo":{
                "email":"help@bekbrace.com",
                "password":"123"
            }
        }

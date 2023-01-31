from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from app.routes.user import user
from app.routes.todo import todo
from app.models.user import User
from app.models.todo import Todo 
from app.auth.jwt_handler import signJWT



#App object
app = FastAPI(
    title="REST API with FastAPI with Mongodb",
    description="This is a simple REST API using fastapi and mongodb"
)

origins = ['http://localhost:3000'] 

app.include_router(user)
app.include_router(todo)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)



from fastapi import APIRouter, HTTPException, Depends, Response, status, Body
from app.models.todo import Todo
from app.auth.jwt_bearer import jwtBearer
from app.auth.jwt_handler import signJWT
from app.schemas.token_schema import Token
from app.service import auth_service
from fastapi.security import OAuth2PasswordRequestForm

todo = APIRouter()

from app.bd.database import (
    
    fetch_one_todo,
    fetch_all_todos,
    create_todo,
    update_todo,
    remove_todo,
) 

@todo.get("/")
def read_root():
    return {"Ping":"Pong"}

@todo.get('/api/todo', response_model=list[Todo], tags=["todo"])
async def get_todo():
    response = await fetch_all_todos()
    return response   

@todo.get('/api/todo{title}', response_model=Todo, tags=["todo"])
async def get_todo_by_id(title):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, f"there is no TODO item with this title {title}")


''', dependencies=[Depends(jwtBearer())]'''
@todo.post('/api/todo', response_model=Todo, tags=["todo"])
async def post_todo(todo:Todo):
    response = await create_todo(todo.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong / Bad request")

@todo.put('/api/todo{title}/', response_model=Todo, tags=["todo"])
async def put_todo(title:str, desc:str):
    response = await update_todo(title, desc)
    if response:
        return response
    raise HTTPException(404, f"there is no TODO item with this title {title}")

@todo.delete('/api/todo{title}', tags=["todo"])
async def delete_todo(title):
    response = await remove_todo(title)
    if response:
        return "Succesfully deleted todo item !"   
    raise HTTPException(404, f"there is no TODO item with this title {title}")    

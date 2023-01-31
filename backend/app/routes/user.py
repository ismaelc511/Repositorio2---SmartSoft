from fastapi import APIRouter, Depends, Response, status, Body
from app.config.db import conn
from app.schemas.user import userEntity, usersEntity
from app.models.user import User
from passlib.hash import sha256_crypt
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT
from app.schemas.token_schema import Token
from app.service import auth_service
from fastapi.security import OAuth2PasswordRequestForm
from app.auth.jwt_handler import signJWT
from app.models.user import UserLoginSchema
from app.auth.jwt_bearer import jwtBearer

user = APIRouter(
    tags=["users"]
)

users = []


@user.get('/users', tags=["users"])
async def find_all_user():
    return usersEntity(conn.local.user.find())


#dependencies=[Depends(jwtBearer())], 

@user.post('/users', dependencies=[Depends(jwtBearer())], response_model=User, tags=["users"])
def create_user(user: User):
    new_user = dict(user)
    new_user["password"] = sha256_crypt.encrypt(new_user["password"])
    del new_user["id"]
    id = conn.local.user.insert_one(new_user).inserted_id

    user = conn.local.user.find_one({"_id": id})

    return userEntity(user)

@user.post("/user/signup", tags=["user"])
def user_signup(user: User):
    users.append(user)
    return signJWT(user.email )

def check_user(data: UserLoginSchema):
    for user in users:
        if user.email == data.email and user.password == data.password:
            return True
        return False

@user.post("/user/login", tags=["user"])
def user_login(user: UserLoginSchema = Body(default=None)):
    if check_user(user):
        return signJWT(user.email)
    else:
        return {
            "error":"Invalid login details!"
        }

@user.post(
    "/login",
    tags=["users"],
    response_model=Token
)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    ## Login for access token

    ### Args
    The app can receive next fields by form data
    - username: Your username or email
    - password: Your password

    ### Returns
    - access token and token type
    """
    access_token = auth_service.generate_token(form_data.username, form_data.password)
    return Token(access_token=access_token, token_type="bearer")


@user.get('/users/{id}', response_model=User, tags=["users"])
def find_user(id: str):
    print(id)
    return userEntity(conn.local.user.find_one({"_id": ObjectId(id)}))


@user.put('/users/{id}', response_model=User, tags=["users"])
def update_user(id: str, user: User):
    conn.local.user.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": dict(user)})
    return userEntity(conn.local.user.find_one({"_id": ObjectId(id)}))

@user.delete('/users/{id}', status_code=status.HTTP_204_NO_CONTENT, tags=["users"])
def delete_user(id: str):
    userEntity(conn.local.user.find_one_and_delete({"_id": ObjectId(id)}))
    return Response(status_code=HTTP_204_NO_CONTENT)

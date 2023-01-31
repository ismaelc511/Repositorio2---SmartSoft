from fastapi import HTTPException, status

from app.models.user import User as UserModel
from app.schemas.user import userEntity
from app.service.auth_service import get_password_hash


def create_user(user: userEntity):

    get_user = UserModel.filter((UserModel.email == user.email) | (UserModel.name == user.name)).first()
    if get_user:
        msg = "Email already registered"
        if get_user.name == user.username:
            msg = "Username already registered"
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=msg
        )

    db_user = UserModel(
        name=user.user,
        email=user.email,
        password=get_password_hash(user.password)
    )

    db_user.save()

    return userEntity.User (
        id = db_user.id,
        username = db_user.username,
        email = db_user.email
    )
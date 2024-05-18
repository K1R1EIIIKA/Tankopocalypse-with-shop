from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    name = models.CharField(max_length=255, verbose_name='Имя')
    email = models.EmailField(max_length=255, verbose_name='Email', unique=True)
    password = models.CharField(max_length=255, verbose_name='Пароль')
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

from .base import *
from .base import env

DEBUG = True

SECRET_KEY = env(
    "DJANGO_SECRET_KEY",
    default='django-insecure-==j9)u&cj*qsrj8g^x75g=+q@ho5fd4z01=-1en7uz%$8fkp39'
)

ALLOWED_HOSTS = ["localhost", "0.0.0.0", "127.0.0.1"]

ADMINS = [("""Django Admin""", "ecom.admin@ecomwebapp.com")]

MANAGERS = ADMINS

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]
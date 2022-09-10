from django.contrib.auth.models import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email



class CustomUserManager(BaseUserManager):

    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError("Please provide a valid email address")

    def create_user(self, username, email, password=None,
                    **extra_info):
        
        # the errors below will only be raised in frontend or in python shell
        if not username:
            raise ValueError("Please Provide a username")

        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError("Sorry, but this app will not work without providing a valid email address")
        
        if not password:
            raise ValueError("Please provide a proper password to continue")
        
        user = self.model(username=username,
                    email=email,
                    **extra_info)
        
        user.set_password(password)
        extra_info.setdefault("is_staff", False)
        extra_info.setdefault("is_superuser", False)

        user.save(using=self._db)
        return user

    def create_superuser(self, username, email,
                         password, **extra_info):

        extra_info.setdefault("is_staff", True)
        extra_info.setdefault("is_superuser", True)
        extra_info.setdefault("is_active", True)

        if extra_info.get("is_staff") is False:
            raise ValueError("Superuser must be a member of staff first")

        if extra_info.get("is_superuser") is False:
            raise ValueError("How come a superuser can't be a superuser?")

        user = self.create_user(username=username,
                                email=email,
                                password=password,
                                **extra_info)

        return user

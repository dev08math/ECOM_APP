import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    
    username = models.CharField(verbose_name=_("username"),
                                db_index=True,
                                max_length=255,
                                unique=True)

    first_name = models.CharField(verbose_name=_("first_name"), max_length=50, null=True, blank=True)

    last_name = models.CharField(verbose_name=_("last_name"), max_length=50, null=True, blank=True)

    email = models.EmailField(verbose_name=_("email"),
                              db_index=True,
                              unique=True)

    is_staff = models.BooleanField(default=False)

    is_superuser = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"  
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager() # this manager handles the creation and obiviously the querying of the indexes in the table

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        return self.username

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
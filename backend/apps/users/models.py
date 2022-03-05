from django.db import models
from django.contrib.auth.models import UserManager, AbstractUser
from django.core.validators import RegexValidator

class MaintainerManager(UserManager):

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    

class Maintainer(AbstractUser):

    #mobile_regex = RegexValidator(r'^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$', 'Allows all possible mobile numbers')
    #mobile_number = models.CharField(max_length=13, unique=True, validators=[mobile_regex])
    username = models.CharField(max_length=30, unique=False)
    email = models.EmailField(verbose_name="email_address", max_length=255, unique=True)

    is_verified = models.BooleanField(default=False)
    expiration_time = models.DateTimeField()

    otp_hex = models.TextField()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = MaintainerManager()

    def __str__(self):
        return self.email
from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):

    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValidationError(_("You must provide a valid email"))

    def normalize_and_validate_email(self, email):
        if email:
            normalized_email = self.normalize_email(email)
            self.email_validator(normalized_email)
            return normalized_email
        else:
            raise ValidationError(_("Email address is required"))

    def create_user(self, first_name,phone_number, last_name, email, password, **extra_fields):
        if not first_name:
            raise ValidationError(_("Users must submit a first name"))

        if not last_name:
            raise ValidationError(_("Users must submit a last name"))

        email = self.normalize_and_validate_email(email)

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number,
            **extra_fields
        )

        user.set_password(password)
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)

        user.save()

        return user

    def create_superuser(self, first_name, last_name, email,phone_number, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        email = self.normalize_and_validate_email(email)

        if not password:
            raise ValidationError(_("Superusers must have a password"))

        user = self.create_user(first_name, last_name,phone_number, email, password, **extra_fields)
        user.save()

        return user

from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class UserRegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['first_name','last_name','id_number','email', 'password1', 'password2']

class UserUpdateForm(forms.ModelForm):
        class Meta:
            model = User
            fields = ['first_name','last_name','id_number','email']

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['phone_number','profile_picture','location','bio','speciality']
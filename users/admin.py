from django.contrib import admin
from django.contrib.auth import get_user_model
User = get_user_model()


class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name','last_name','id_number','phone_number')

admin.site.register(User, UserAdmin)

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Maintainer

admin.site.register(Maintainer)

class MaintainerAdmin(UserAdmin):
    model = Maintainer
    list_display = '__all__'
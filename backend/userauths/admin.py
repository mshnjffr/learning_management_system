from django.contrib import admin
from .models import User, Profile

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name', 'created_at']

admin.site.register(User)
admin.site.register(Profile, ProfileAdmin)
# Register your models here.

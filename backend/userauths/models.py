from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save 
import uuid 


class User(AbstractUser):
    username = models.CharField(max_length=35, unique=True)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100)
    otp = models.CharField(max_length=100, null=True, blank=True)
    refresh_token = models.CharField(max_length=1000, null=True, blank=True)

    #when user logins in, we will use email 
    USERNAME_FIELD = 'email'
    #when user is creating an account, username is required
    REQUIRED_FIELDS = ['username']

    #return str representive of the model 
    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        super(User, self).save(*args,**kwargs)


class Profile(models.Model):
    #delete profile when user gets deleted 
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.FileField(upload_to="user_folder", default="default-user.jpg", null=True, blank=True)
    full_name = models.CharField(max_length=35)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.full_name)
    
    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)

#when an account hasbeen created, a profile is automatically created for the user 
def create_user_profile(sender, instance, created, **kwargs):
    if created: 
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)

# Create your models here.

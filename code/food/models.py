from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from .models import *
from django.dispatch import receiver #add this
from django.db.models.signals import post_save #add this

#DataFlair Models

class Food(models.Model):
  
    loggeduser= models.CharField(max_length = 50, default='Food Items')
    foodname = models.CharField(max_length = 50)
    foodpic = models.ImageField()
    quantity = models.CharField(max_length = 30, default='Food Qty')
    contactno = models.CharField(max_length = 10)
    location = models.TextField(default = 'Address')
    city= models.CharField(max_length =50)
    
    def __str__(self):
        return self
   
class Order(models.Model):
    foodname = models.CharField(max_length = 50)
    foodpic = models.ImageField()
    quantity = models.CharField(max_length = 30, default='Food Qty')
    contactno = models.CharField(max_length = 10)
    location = models.TextField(default = 'Address')
    city= models.CharField(max_length =50)
    loggeduser= models.CharField(max_length = 50)
    foodcreateuser=models.CharField(max_length = 50)
    deliverycontact=models.CharField(max_length = 10)
    deliverymail=models.EmailField()
    deliveryaddress = models.TextField(default = 'Address')
    
    def __str__(self):
        return self

class Profile(models.Model):

    user    = models.OneToOneField(User, on_delete=models.CASCADE)
    
   

    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
		instance.profile.save()
        

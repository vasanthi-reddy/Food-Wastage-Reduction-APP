from django import forms
from .models import Food
from .models import Order
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from django.forms import ModelForm
from django.contrib.auth.models import User
		
class FoodCreate(forms.ModelForm):
     loggeduser = forms.CharField(widget=forms.HiddenInput()) 
     class Meta:
             
            model = Food
            fields='__all__'

class OrderCreate(forms.ModelForm):
    
     class Meta:
             
           
             model = Order
             fields=['loggeduser','deliverycontact','deliverymail','deliveryaddress']
             widgets = {'loggeduser': forms.HiddenInput(), 'foodcreateuser': forms.HiddenInput()}
             
class UserForm(forms.ModelForm):

     class Meta: 
            model = User
            fields = ('username','first_name', 'last_name', 'email')
     

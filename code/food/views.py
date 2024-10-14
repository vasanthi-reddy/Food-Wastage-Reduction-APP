from django.shortcuts import get_object_or_404, redirect, render 
from django.http import HttpResponse
from django.forms import inlineformset_factory
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
# Create your views here.
from django.contrib.auth.models import User
from .forms import UserForm
from .filters import FoodFilter

from django.contrib import auth
from .models import *
from .forms import FoodCreate,OrderCreate
def signup(request):
    if request.method == "POST":
        if request.POST['password1'] == request.POST['password2']:
            try:
                User.objects.get(username = request.POST['username'])
                
                return render (request,'food/user_register.html', {'error':'Username is already taken!'})
            except User.DoesNotExist:
                user = User.objects.create_user(request.POST['username'],password=request.POST['password1'],email=request.POST['email'],first_name=request.POST['first_name'],last_name=request.POST['last_name'])
                auth.login(request,user)
                return redirect('home')
        else:
            return render (request,'food/user_register.html', {'error':'Password does not match!'})
    else:
        return render(request,'food/user_register.html')
        
 
       
def login(request):
    if request.method == 'POST':
        user = auth.authenticate(username=request.POST['username'],password = request.POST['password'])
        if user is not None:
            auth.login(request,user)
            return redirect('home')
        else:
            return render (request,'food/user_login.html', {'error':'Username or password is incorrect!'})
    else:
    
        return render(request,'food/user_login.html')
        
  

def logout(request):
    if request.method == 'POST':
        auth.logout(request)
    return redirect('index') 



    
#DataFlair
def home(request):
    shelf = Food.objects.all().order_by('-id')
    if not shelf:
       return render (request,'food/home.html', {'error':'there is no food'})
    
    else :
       
         return render(request, 'food/home.html', {'shelf': shelf})

def header(request):
    return render(request, 'food/header.html')
    
    
def index(request):
    return render(request, 'food/index.html')
    
def upload(request):
        upload = FoodCreate(initial={'loggeduser': request.user.username})
        if request.method == 'POST':
                upload = FoodCreate(request.POST, request.FILES)
                if upload.is_valid():
                    upload.save()              
                    return redirect('home')
                else:
                    return HttpResponse("""your form is wrong, reload on <a href = "{{ url : 'index'}}">reload</a>""")
        else:
            return render(request, 'food/upload_food.html', {'upload_form':upload})
    
def myfood(request):
    username=request.user.username
    getfood = Food.objects.filter(loggeduser =username).order_by('-id')
    if not getfood:
       return render (request,'food/my_food_details.html', {'error':'there is no food'})
    
    else :
       
         return render(request, 'food/my_food_details.html', {'getfood': getfood})
    
def myorder(request):
    username=request.user.username
    getorder = Order.objects.filter(loggeduser =username).order_by('-id')
    if not getorder:
       return render (request,'food/myorder.html', {'error':'there is no Order '})
    
    else :
       
         return render(request, 'food/myorder.html', {'getorder': getorder})
         
def soldorder(request):
    

    getsoldorder = Order.objects.filter(foodcreateuser =request.user.username)
   
    if not getsoldorder:
       return render (request,'food/soldorder.html', {'error':'there is no Sold Order '})
    
    else :
       
         return render(request, 'food/soldorder.html', {'getsoldorder': getsoldorder})
    
def checkplaceorder(request):
    
    placeorder1=Food.objects.filter(loggeduser=request.user.username)
   
    if not placeorder1:
         return HttpResponse("""your form is wrong, reload on <a href = "{{ url : 'index'}}">reload</a>""")
    
    else :
       
         return render (request,'food/home.html', {'error':'You cant place your own food'})
           


    
  
   

def update_food(request, food_id):
    food_id = int(food_id)
    try:
        food_sel = Food.objects.get(id = food_id)
    except Food.DoesNotExist:
        return redirect('index')    
    food_form = FoodCreate(request.POST or None, instance = food_sel)
    if food_form.is_valid():
        food_form.save()
        return redirect('myfood')
    return render(request, 'food/upload_food.html', {'upload_form':food_form})

def delete_food(request, food_id):
    food_id = int(food_id)
    try:
        food_sel = Food.objects.get(id = food_id)
    except Food.DoesNotExist:
        return redirect('index')
    food_sel.delete()
    return redirect('myfood')
    


   
def createorder(request):  
    
    placeorder1=Food.objects.filter(loggeduser=request.user.username)
    data = Food.objects.get(id=request.COOKIES['food_id'])
    order_form = OrderCreate(initial={'loggeduser': request.user.username})
    
    if request.method == 'POST':
       
        order_form = OrderCreate(request.POST, request.FILES)
            
        if order_form.is_valid():
            new_author = order_form.save(commit=False)
            new_author.foodname=data.foodname
            new_author.foodpic=data.foodpic
            new_author.quantity=data.quantity
            new_author.contactno=data.contactno
            new_author.location=data.location
            new_author.city=data.city
            new_author.foodcreateuser=data.loggeduser
            new_author.save()
            
            return redirect('home')
        else:
            return HttpResponse("""your form is wrong, reload on <a href = "{{ url : 'index'}}">reload</a>""")
    
     
        
            
    else:
            return render(request, 'food/order_food.html',{'order_form':order_form})
          
    
def userpage(request):
	if request.method == "POST":
		user_form = UserForm(request.POST, instance=request.user)
		
		if user_form.is_valid():
		    user_form.save()
		    messages.success(request,('Your profile was successfully updated!'))
	
		else:
		    messages.error(request,('Unable to complete request'))
		
	user_form = UserForm(instance=request.user)
	
	return render(request = request, template_name ="food/user.html", context = {"user":request.user, 
		"user_form": user_form})
        
def food_list(request):

    f = FoodFilter(request.GET, queryset=Food.objects.all())
    return render(request, 'food/searchfood.html', {'filter': f})
  

  
  


# def details(request, food_id):
#   food_id = int(food_id)
#   try:
#       food_sel = food.objects.get(id = food_id)
#   except food.DoesNotExist:
#       return redirect('index')
#   url = food_sel.picture.url
#   return render(request, 'food/details.html', {'food':food_sel, 'url':url})

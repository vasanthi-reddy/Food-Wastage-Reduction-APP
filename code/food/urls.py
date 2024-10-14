from django.urls import path
from . import views
from foodwastagereduction.settings import DEBUG, STATIC_URL, MEDIA_URL, MEDIA_ROOT

from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
#DataFlair Django Tutorials
urlpatterns = [
path('', views.index, name = 'index'),
path('header/', views.header, name = 'header'),
path('register/', views.signup, name="signup"),
	path('login/', views.login, name="login"),  
	path('logout/', views.logout, name="logout"),
    path('user/', views.userpage, name = "userpage"),
    path('home/', views.home, name="home"),
    path('list/', views.food_list, name="food_list"),
 	path('upload/', views.upload, name = 'upload-food'),
    path('createorder/', views.createorder,  name = 'createorder'),
    path('myfood/', views.myfood, name='myfood'),
    path('myorder/', views.myorder, name='myorder'),
    path('checkplaceorder/', views.checkplaceorder),
    path('soldorder/', views.soldorder, name='soldorder'),
    path('myfood/update/<int:food_id>', views.update_food),
	path('myfood/delete/<int:food_id>', views.delete_food)
    
]
urlpatterns += staticfiles_urlpatterns()
if DEBUG:
   
    urlpatterns += static(MEDIA_URL, document_root = MEDIA_ROOT)

'''x-html has doctype manadatory while html doesn't require you to declare doctype
xmlns type is mandatory in html
html, head, body and title is mandatory
must be properly nested
must be properly closed
must be used in lowercase

'''
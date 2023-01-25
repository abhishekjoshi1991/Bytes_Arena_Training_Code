from django.shortcuts import render
from .models import Student
from .serializers import StudentSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

'''
Token Authentication: 

Add 'rest_framework.authtoken' in install apps

Methods of creating the token:
1. Using Admin Application (From Admin Panel)
    After adding 'rest_framework.authtoken' in install apps and doing migrations, new table is
    created in admin panel with AUTH TOKEN. From that we can create token for any user
    
2. Using Django manage.py command: python manage.py drf_create_token <username> (* New user with, user and Abhi@1884)
    e.g. python3 manage.py drf_create_token admin
    if token is already present for particular user then it returns that token else it creates new one
    
3. By exposing an api endpoint:
    provide a mechanism for clients to obtain a token given the username and password. 
    REST framework provides a built-in view to provide this behaviour. To use it, add the obtain_auth_token view to your URLconf:
    
    from rest_framework.authtoken import views
    urlpatterns += [
        path('api-token-auth/', views.obtain_auth_token)
    ]
    
    then hit url 'http://127.0.0.1:8000/api-token-auth/' with POST request, with username=username, password=password in request body
    it will return token if present for that user else create new one
    
    This method return token only, if we want to get more output along with token then we can inherit base code and make 
    changes in it (to get more information refer video)
    
4. Using Signals
    Signal will create token automatically when new user is created,
    post_save trigger when new user created
    
    Note that you'll want to ensure you place this code snippet in an installed models.py module

'''

'''
httpie package:

it is command line client work as postman, means we can send GET, POST.. request using this tool

pip3 install httpie
syntax: http [method] URL [ITEM]

GET request (use trailing slash)
http http://127.0.0.1:8000/studentapi/
http http://127.0.0.1:8000/studentapi/1/

POST:
http POST http://127.0.0.1:8000/studentapi/ name=abhi roll=3 city=pune

PATCH
http PATCH http://127.0.0.1:8000/studentapi/3/ name=abhi1

.....

Using Token in request
http http://127.0.0.1:8000/studentapi/ 'Authorization:Token 2d02f60b9133a5c0f90b35ad5405bdc403124bc1'

POST
http POST http://127.0.0.1:8000/studentapi/ name=abhi roll=4 city=pune 'Authorization:Token 2d02f60b9133a5c0f90b35ad5405bdc403124bc1'
'''

# Create your views here.

# Using Token Authentication
class StudentAPI(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


'''
with this try to get records without token and with token'''

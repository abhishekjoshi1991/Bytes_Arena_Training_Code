from django.shortcuts import render
from .models import Student
from .serializers import StudentSerializer
from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

'''
JWT (JSON Web Token) Authentication: 

pip3 install djangorestframework-simplejwt

JWT does not use database to use tokens

JWT default setting is access token expires after 5 minutes and refresh token after 1 day


To generate Token:
use POST request:
http POST http://127.0.0.1:8000/get_token/ username='admin' password='admin'

response like:
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc0MjE0MzAzLCJpYXQiOjE2NzQyMTQwMDMsImp0aSI6ImMwMjkzYTBkNWI5NTQyN2Y4NmY2NWQwZmIzMThmNTg1IiwidXNlcl9pZCI6MX0.lWeiwq3RwDWBZ9SfL2C9AiPtKQR4ZNmj96KeGf-xcBg",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY3NDMwMDQwMywiaWF0IjoxNjc0MjE0MDAzLCJqdGkiOiJjZGRkNGMyY2ZhZjY0NTdkYjUyMzMxZDY3MjE0ODhhNyIsInVzZXJfaWQiOjF9.HkHa4K1_yDOoaIdZ3YEdUu057WXDFdorRDqhdONZQjA"
}

access is access token and refresh is refresh token that can be used re generate access token

To Verify Token:
http POST http://127.0.0.1:8000/verify_token/ token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc0MjE0MzAzLCJpYXQiOjE2NzQyMTQwMDMsImp0aSI6ImMwMjkzYTBkNWI5NTQyN2Y4NmY2NWQwZmIzMThmNTg1IiwidXNlcl9pZCI6MX0.lWeiwq3RwDWBZ9SfL2C9AiPtKQR4ZNmj96KeGf-xcBg'

Response 200 ok means token s verified


To Refresh Token:
http POST http://127.0.0.1:8000/refresh_token/ refresh='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY3NDMwMDQwMywiaWF0IjoxNjc0MjE0MDAzLCJqdGkiOiJjZGRkNGMyY2ZhZjY0NTdkYjUyMzMxZDY3MjE0ODhhNyIsInVzZXJfaWQiOjF9.HkHa4K1_yDOoaIdZ3YEdUu057WXDFdorRDqhdONZQjA'

'''

# Create your views here.

# Using Token Authentication
class StudentAPI(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


    '''
    without passing access token in request, we can not access api
    
    to GET api 
    http http://127.0.0.1:8000/studentapi/ 'Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc0MjE1MjQzLCJpYXQiOjE2NzQyMTQzMjgsImp0aSI6Ijk5YjBhNDdmNGU0NjQzNTE5ZDc3M2NjZGU0ZTM5MmE4IiwidXNlcl9pZCI6MX0.ob8k6FRUt4CjnwJtQvJ2zPpewBJFpw39ZE2mP43gNvE'

    POST API
    http POST http://127.0.0.1:8000/studentapi/ name=raj city=pune roll=5 'Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc0MjE1NzI2LCJpYXQiOjE2NzQyMTQzMjgsImp0aSI6IjM4NWNkYmIzY2MwZDQ1MjdhNGZiNjE3ZDhlMTNiMTFlIiwidXNlcl9pZCI6MX0.yp9hlPVlOlM2DBKnqsvhAQh4zOT0SSWm0mvEWYxD7dc'
    
    '''

# To change default JWT setting, in settings.py we can put
'''
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}

other parameters that can be set can be found out at
https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html


also globally we can set setting for JWT as 

REST_FRAMEWORK = {
    ...
    'DEFAULT_AUTHENTICATION_CLASSES': (
        ...
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
    ...
}
'''



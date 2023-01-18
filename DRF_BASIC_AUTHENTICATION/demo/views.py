from django.shortcuts import render
from .models import Student
from .serializers import StudentSerializer
from rest_framework import viewsets
from rest_framework.authentication import BaseAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
'''
Authentication: To verify identity of user, so as to determine request should be permitted or not

Types in Django:
Basic Authentication  -- Authenticated based on users username and password, mostly used in testing purpose
Session Authentication
Token Authentication
Remote User Authentication
Custom Authentication


Permissions:
To grant or deny access for different classes of users to different parts of API

In DRF permissions are given in the form of list of permission classes
Permission classes:
AllowAny -- allows unrestricted access even if user is authenticated or not
Is Authenticated -- deny permission to unauthenticated users
IsAdminUser -- gives permission to user whose is_staff attribute is True
IsAuthenticatedOrReadOnly
DjangoModelPermissions
DjangoObjectPermissions, etc
'''

# Create your views here.
class StudentAPI(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    # to give authentication and permission class
    # authentication_classes = [BaseAuthentication] # this line does not work, gives error when uncommented

    # Try with different permission classes

    # we have other user with username as user and pw as Abhi@1884
    permission_classes = [IsAuthenticated] # will work for both user
    # permission_classes = [IsAdminUser]  # IsAdminUser is one if is_staff is True, will work for admin uer


'''
Instead of writing these classes in each class here we can set
globally in setting.py file, see setting.py file

but we can change global permission in individual class using above syntax'''
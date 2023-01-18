from django.shortcuts import render
from .models import Student
from .serializers import StudentSerializer
from rest_framework import viewsets
from rest_framework.authentication import BaseAuthentication, SessionAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly
'''
Authentication: To verify identity of user, so as to determine request should be permitted or not

Types in Django:
Basic Authentication 
Session Authentication -- This authentication scheme uses Django's default session backend for authentication
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
IsAuthenticatedOrReadOnly -- to give access to api only to authenticated user and read only permission (GET) to un authorized user
DjangoModelPermissions
DjangoObjectPermissions, etc
'''

# Create your views here.
class StudentAPI(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    # to give authentication and permission class
    authentication_classes = [SessionAuthentication]  # this line does not work, gives error when uncommented

    # Try with different permission classes

    # we have other user with username as user and pw as Abhi@1884
    # permission_classes = [IsAuthenticated] # will work for both user
    # permission_classes = [IsAdminUser]  # IsAdminUser is one if is_staff is True, will work for admin uer
    # permission_classes = [IsAuthenticatedOrReadOnly]  # IsAuthenticatedOrReadOnly readonly access to non authenticated user else full access
    '''
    # DjangoModelPermissions
    no access at all for non authenticated user
    readonly access by default for user other than admin, post, put, patch, delete access can be given from admin page to that user
    '''
    # permission_classes = [DjangoModelPermissions]

    '''
    # DjangoModelPermissionsOrAnonReadOnly
    read access to non authenticated user also
    readonly access by default for user other than admin, post, put, patch, delete access can be given from admin page to that user
    '''

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    '''
    for django model permissions, refer video session authentication geeky shows
    '''

'''
Instead of writing these classes in each class here we can set
globally in setting.py file, see setting.py file

but we can change global permission in individual class using above syntax'''
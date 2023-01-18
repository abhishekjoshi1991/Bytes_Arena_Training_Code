from django.shortcuts import render
from .models import Student
from .serializers import StudentSerializer
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from .permissions import MyPermission

'''
Custom Permission Class:
Instead using default permission classes below

AllowAny -- allows unrestricted access even if user is authenticated or not
Is Authenticated -- deny permission to unauthenticated users
IsAdminUser -- gives permission to user whose is_staff attribute is True
IsAuthenticatedOrReadOnly -- to give access to api only to authenticated user and read only permission (GET) to un authorized user
DjangoModelPermissions
DjangoObjectPermissions, etc

we can use our own custom class, we will create separate file for this permission and import that here
'''

# Create your views here.
class StudentAPI(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    # to give authentication and permission class
    authentication_classes = [SessionAuthentication]  # suppose we will use SessionAuthentication as Auth class
    permission_classes = [MyPermission] # Here we will use custom permission


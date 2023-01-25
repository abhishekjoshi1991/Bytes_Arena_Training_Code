from django.shortcuts import render
from .models import Student, Post
from .serializers import StudentSerializer, UserSerializer, PostSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle, ScopedRateThrottle
from .c_throttling import CustomRatethrottle
from rest_framework.generics import ListAPIView, CreateAPIView

'''
Throttling:

It is process by which we are giving no of limit of access to api to authenticated and 
un authenticated user

that means how many request that user can send to server per day/minutes etc..4
'''

# Create your views here.
class StudentAPI(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly] # will work for both user
    throttle_classes = [UserRateThrottle, AnonRateThrottle]
    # Limit of request per user is defined in setting.py, there also we can set globally
    # throttle classes, then it will be applied for all views, here we have defined on view level

    '''
    Now, UserRateThrottle is defined globally, so if we want to have different user rates
    in different in views, then that won't be possible, for that we can create new class
    which inherits from UserRateThrottle in that we can defined new scope and add that scope in
    setting.py file, lets create
    that custom rate throttle in c_throttling.py file and use it in below User api
    '''


class UserAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly] # will work for both user
    throttle_classes = [AnonRateThrottle, CustomRatethrottle]

'''
ScopedRateThrottle:
It can be used to restrict access to specific parts of the API (like on read, create ..)
Use throttle_scope field for defining the scope and same is reflected in setting.py

We will use concrete views for demo
'''
class PostList(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'viewpost'

class PostCreate(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'createpost'


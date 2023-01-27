from django.shortcuts import render
from .serializers import StudentSerializer
from .models import Student
from rest_framework.generics import ListAPIView
from .custompagination import CustomPagePagination, CustomOffsetPagination


'''
Pagination:
1. PageNumberPagination
Globally we can set pagination setting in settings.py file as

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 5,
}

where page_size is maximum number of records per page
just use

class StudentAPI(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
and pagination will get applied to all views present

Also pagination can be set per view, instead of setting it globally in settings.py file
as below,

here we have defined custom pagination class to defined page_size attribute and used same
class in code

'''
class StudentAPI(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    pagination_class = CustomPagePagination


'''
2. LimitOffsetPagination:

Allows to set limit(no of records er page as in prevoius case) and offset means
from where we need to show records
i.e.

http://127.0.0.1:8000/studentapi/?limit=4&offset=5

this means show 4 records per page starting from id=6 (5+1)

Globally we can do the setting as 

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
}


Also per view we can set the pagination as

'''
class StudentAPINEW(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    pagination_class = CustomOffsetPagination
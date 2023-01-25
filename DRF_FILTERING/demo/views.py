from django.shortcuts import render
from .models import Student
from .serializers import StudentSerializer
from rest_framework.generics import ListAPIView
from rest_framework.filters import SearchFilter

# Create your views here.
'''
Filtering:
Allows to filter data based on condition

Using get_queryset() method: lets say we can filter the records, those are created by specific user
e.g. in our model, we have pass_by field, if student is passed by user1 then after logging by user1, he is
able to see only his passed records etc.

'''

# Method 1: using get_queryset method
class StudentList(ListAPIView):
    # only need to give following two lines
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    def get_queryset(self):
        user = self.request.user
        return Student.objects.filter(pass_by=user)

# Method 2: Using django-filter library
'''
pip3 install django-filter

add django_filters in installed apps

in settings.py, globally we can set the filter setting as

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}

instead of defining globally, we can apply based on per view also

for that in view.py file, we can import as
from django_filters.rest_framework import DjangoFilterBackend

and then view for which we want to apply fo filter can be coded as

class StudentListNew(ListAPIView):
    # only need to give following two lines
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['city', 'name']
'''
class StudentListNew(ListAPIView):
    # only need to give following two lines
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filterset_fields = ['city', 'name'] # it will allow to filter based on city, single or multiple fields can be passed

    '''
    to filter records based on city we can pass params in postman as city --> pune
    to filter those records having city = pune
    
    or simply in url we can call 
    http://127.0.0.1:8000/student_list_new/?city=pune
    
    '''


# Search Filter:
'''
to use search filter import following

from rest_framework.filters import SearchFilter

after applying the search we can pass url as

http://127.0.0.1:8000/student_list_new/?search=1 (to search roll =1)

instead of word search in url we can pass custom letter as well

for that in setting.py file include
REST_FRAMEWORK = {
    'SEARCH_PARAM' = 'mysearch'
}
now we can call
http://127.0.0.1:8000/student_list_new/?mysearch=1 (to search roll =1)


The search behavior may be restricted by prepending various characters to the search_fields.

'^' Starts-with search.
'=' Exact matches.
'@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
'$' Regex search.

e.g
search_fields = ['^roll']
search_fields = ['=roll']
'''
class StudentListSearch(ListAPIView):
    # only need to give following two lines
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [SearchFilter]
    search_fields = ['roll']  # multiple values can also be passed
from django.shortcuts import render
from .models import Student
from .serializers import StudentSerializer
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView, \
    ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveDestroyAPIView, RetrieveUpdateAPIView

# Create your views here.
'''
Use browsable api to see the results for more clarity
Following are some concrete views:

ListAPIView
CreateAPIView
RetrieveAPIView
UpdateAPIView
DestroyAPIView
ListCreateAPIView
RetrieveUpdateAPIView
RetrieveDestroyAPIView
RetrieveUpdateDestroyAPIView
'''
class StudentList(ListAPIView):
    # only need to give following two lines
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentCreate(CreateAPIView):
    # only need to give following two lines
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentRetrieve(RetrieveAPIView):
    # only need to give following two lines
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentUpdate(UpdateAPIView):
    # only need to give following two lines
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDestroy(DestroyAPIView):
    # only need to give following two lines
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentLC(ListCreateAPIView):
    # only need to give following two lines
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentRU(RetrieveUpdateAPIView):
    # only need to give following two lines
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentRD(RetrieveDestroyAPIView):
    # only need to give following two lines
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentRUD(RetrieveUpdateDestroyAPIView):
    # only need to give following two lines
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


'''
instead of writing all he views and urls for that we can use 
LC and RUD classes to get CRUD'''

class StudentCRUD(ListCreateAPIView, RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
from django.shortcuts import render
from .serializers import StudentSerializer
from .models import Student
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
# Create your views here.

'''
Generic API View:
This class extends REST Framework's API View class by adding some more functionality

Mixin:
Mixins are a language concept that allows a programmer to inject some code into a class. 
Mixin programming is a style of software development, in which units of functionality are 
created in a class and then mixed in with other classes. A mixin class acts as the parent class, 
containing the desired functionality.

Common behaviour are added in MIXIN class (like getting List of students, add/ update functionality etc.

Different Mixin classes
ListModelMixin -- provides list() method to list queryset
CreateModelMixin -- provides create() method to create and save new model instance
RetrieveModelMixin -- provides retrieve() method that provide existing model instance
UpdateModelMixin -- provides update() method to update and save existing model instance
DestroyModelMixin -- provides destroy() method to delete existing model instance

'''

# ListModelMixin
class StudentList(ListModelMixin, GenericAPIView):
    # below two lines are common in every mixin class
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

# CreateModelMixin
class StudentCreate(CreateModelMixin, GenericAPIView):
    # below two lines are common in every mixin class
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

# RetrieveModelMixin
class StudentRetrieve(RetrieveModelMixin, GenericAPIView):
    # below two lines are common in every mixin class
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    # no need to use pk anywhere
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

# UpdateModelMixin
class StudentUpdate(UpdateModelMixin, GenericAPIView):
    # below two lines are common in every mixin class
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    # no need to use pk anywhere, put patch both work is done
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

# DestroyModelMixin
class StudentDestroy(DestroyModelMixin, GenericAPIView):
    # below two lines are common in every mixin class
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    # no need to use pk anywhere
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

'''
but here we need to define different urls for all mixin above to work,
instead of this

we can merge the code,
we do not need pk in list and create method, we can combine that
and other mixin requires pk so we can combine those
'''
class StudentListCreate(ListModelMixin, CreateModelMixin, GenericAPIView):
    # below two lines are common in every mixin class
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class StudentRUD(RetrieveModelMixin,UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    # below two lines are common in every mixin class
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    # no need to use pk anywhere
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
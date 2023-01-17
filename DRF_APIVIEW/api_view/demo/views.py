from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import StudentSerializer
from .models import Student
from rest_framework import status
from rest_framework.views import APIView

# Create your views here.

# Only for GET request
# @api_view()  # by default @api_view(['GET'])
# def hello_world(request):
#     return Response({'msg':'GET request called'})

# Only for POST request
# @api_view()
# def hello_world(request):
#     return Response({'msg':'POST request called'})

# For both GET and POST reqeust
@api_view(['GET','POST'])  # need to pass GET, POST if we are using both methods in code, else will get method not allowed error
def hello_world(request):
    if request.method == 'GET':
        return Response({'msg': 'GET request called'})
    if request.method == 'POST':
        print('-------',request.data)
        return Response({'msg':'POST request called', 'data': request.data})



# CRUD Operation using Function Based API_VIEW

@api_view(['GET','POST','PUT','PATCH', 'DELETE'])
def student_crud(request, pk=None):
    # here we do not need to use json loads and all and JsonResponse
    if request.method == 'GET':
        # id = request.data.get('id', None)  # if id is getting passed through postman
        id = pk  # if id is getting passed from url, or browsable api
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                serializer = StudentSerializer(stu)
                return Response(serializer.data)
            else:
                return Response({'message': 'id not present'})
        stu = Student.objects.all()
        serializer = StudentSerializer(stu, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            res = {'msg': 'data created successfully'}
            return Response(res, status=status.HTTP_201_CREATED)  # status can be passed
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':  # for complete update
        # id = request.data.get('id', None)  # if id is getting passed through postman
        id = pk  # if id is getting passed from url, or browsable api
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                serializer = StudentSerializer(stu, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    res = {'msg': 'data updated successfully'}
                    return Response(res)
                return Response(serializer.errors)
            else:
                return Response({'message': 'id not present'})

    elif request.method == 'PATCH':  # for partial update
        # id = request.data.get('id', None)  # if id is getting passed through postman
        id = pk  # if id is getting passed from url, or browsable api
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                serializer = StudentSerializer(stu, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    res = {'msg': 'data updated successfully'}
                    return Response(res)
                return Response(serializer.errors)
            else:
                return Response({'message': 'id not present'})

    elif request.method == 'DELETE':
        # id = request.data.get('id', None)  # if id is getting passed through postman
        id = pk  # if id is getting passed from url, or browsable api
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                stu.delete()
                res = {'msg': 'data deleted successfully'}
                return Response(res)
            else:
                return Response({'message': 'id not present'})


# Class based API View
# API View is subclass of View class
# it is different from View in following ways
'''
Request passed to handlers will be REST framework's request instead of django http request
may return REST framework's response instead of Django's httpresponse
'''

# CRUD Operation using Class Based API View

class StudentAPI(APIView):
    def get(self, request, pk=None):
        id = pk  # if id is getting passed from url, or browsable api
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                serializer = StudentSerializer(stu)
                return Response(serializer.data)
            else:
                return Response({'message': 'id not present'})
        stu = Student.objects.all()
        serializer = StudentSerializer(stu, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            res = {'msg': 'data created successfully'}
            return Response(res, status=status.HTTP_201_CREATED)  # status can be passed
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        id = pk or request.data.get('id')  # if id is getting passed from url, or browsable api
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                serializer = StudentSerializer(stu, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    res = {'msg': 'data updated successfully'}
                    return Response(res)
                return Response(serializer.errors)
            else:
                return Response({'message': 'id not present'},status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        id = pk or request.data.get('id') # if id is getting passed from url, or browsable api
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                serializer = StudentSerializer(stu, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    res = {'msg': 'data updated successfully'}
                    return Response(res)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'message': 'id not present'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        id = pk or request.data.get('id') # if id is getting passed from url, or browsable api
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                stu.delete()
                res = {'msg': 'data deleted successfully'}
                return Response(res, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'id not present'}, status=status.HTTP_400_BAD_REQUEST)
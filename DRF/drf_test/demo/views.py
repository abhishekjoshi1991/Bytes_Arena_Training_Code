from django.shortcuts import render
import json
from .models import Student
from .serializers import StudentSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View

# Create your views here.

# Serialization
# From postman using GET request we can get the data
# Creating serializer for single object/ single student data
def student_details(request, pk):
    # get one object from student table with id=1
    stu = Student.objects.get(id=pk)

    # serialize stu to python data
    serializer = StudentSerializer(stu)

    # render the json
    json_data = JSONRenderer().render(serializer.data)

    return HttpResponse(json_data, content_type='application/json')

    # or using JsonResponse()
    # return JsonResponse(serializer.data)


# Creating serializer for all data of model/queryset
def all_student_details(request):
    # get all objects from student table
    stu = Student.objects.all()

    # serialize stu to python data
    serializer = StudentSerializer(stu, many=True)  # many = True for multiple data

    # render the json
    json_data = JSONRenderer().render(serializer.data)

    return HttpResponse(json_data, content_type='application/json')

    # or using JsonResponse(), we need to pass safe=false to deal with list
    # return JsonResponse(serializer.data, safe = False)


# Deserialization
# Converting json to complex data type to store into db
# From postman(third party application) we can post data using post request
# to ignore csrf token error, import csrf_exempt
@csrf_exempt
def create_student(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        serializer = StudentSerializer(data=json_data)
        # For creating multiple data, use many=True
        if serializer.is_valid():
            serializer.save()
            res = {'msg':'data created successfully'}
            json_res = json.dumps(res)
            return HttpResponse(json_res, content_type='application/json')
        json_res = json.dumps(serializer.errors)
        return HttpResponse(json_res, content_type='application/json')


# CRUD operation for api's: Using Function based views
# Read: Read student data, if id is passes then get details for that id else get all data
# through postman pass payload as {'id': 1} to get specific id data or without any payload (to get all data) with GET request
def read_api(request):
    if request.method == 'GET':
        if request.body:
            json_data = json.loads(request.body)
        else:
            json_data = {}
        id = json_data.get('id', None)  # if id key not present, returns None
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                serializer = StudentSerializer(stu)
                return JsonResponse(serializer.data)
            else:
                return JsonResponse({'message': 'id not present'})
        stu = Student.objects.all()
        serializer = StudentSerializer(stu, many=True)
        return JsonResponse(serializer.data, safe=False)

# CREATE: Pass payload from postman in the format as {name:,city:, roll:}
# while creating record csrf is required
@csrf_exempt
def create_api(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        serializer = StudentSerializer(data=json_data)
        # For creating multiple data
        # serializer = StudentSerializer(data=json_data, many=True)
        if serializer.is_valid():
            serializer.save()
            res = {'msg':'data created successfully'}
            return JsonResponse(res)
        return JsonResponse(serializer.errors)


# UPDATE: Pass payload in postman with id and combination of name or city or roll
# while updating record csrf is required
@csrf_exempt
def update_api(request):
    if request.method == 'PUT':
        json_data = json.loads(request.body)
        id = json_data.get('id', None)  # if id key not present, returns None
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                serializer = StudentSerializer(stu,data=json_data, partial=True) # partial true for partial update
                if serializer.is_valid():
                    serializer.save()
                    res = {'msg': 'data updated successfully'}
                    return JsonResponse(res)
                return JsonResponse(serializer.errors)
            else:
                return JsonResponse({'message': 'id not present'})


# DELETE: Pass payload in postman as {"id": id to delete}
# for delete csrf_exempt must be set
@csrf_exempt
def delete_api(request):
    if request.method == 'DELETE':
        json_data = json.loads(request.body)
        id = json_data.get('id', None)  # if id key not present, returns None
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                stu.delete()
                return JsonResponse({'message': 'Record Deleted Successfully!'})


# CRUD Operation using class based views:
# Create class which inherits View, use same code as above in default view functions
@method_decorator(csrf_exempt, name='dispatch')
class StudentAPI(View):
    def get(self, request):
        if request.body:
            json_data = json.loads(request.body)
        else:
            json_data = {}
        id = json_data.get('id', None)  # if id key not present, returns None
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                serializer = StudentSerializer(stu)
                return JsonResponse(serializer.data)
            else:
                return JsonResponse({'message': 'id not present'})
        stu = Student.objects.all()
        serializer = StudentSerializer(stu, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        json_data = json.loads(request.body)
        serializer = StudentSerializer(data=json_data)
        # For creating multiple data
        # serializer = StudentSerializer(data=json_data, many=True)
        if serializer.is_valid():
            serializer.save()
            res = {'msg': 'data created successfully'}
            return JsonResponse(res)
        return JsonResponse(serializer.errors)

    def put(self, request):
        json_data = json.loads(request.body)
        id = json_data.get('id', None)  # if id key not present, returns None
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                serializer = StudentSerializer(stu, data=json_data, partial=True)  # partial true for partial update
                if serializer.is_valid():
                    serializer.save()
                    res = {'msg': 'data updated successfully'}
                    return JsonResponse(res)
                return JsonResponse(serializer.errors)
            else:
                return JsonResponse({'message': 'id not present'})

    def delete(self, request):
        json_data = json.loads(request.body)
        id = json_data.get('id', None)  # if id key not present, returns None
        if id:
            try:
                stu = Student.objects.get(id=id)
            except:
                stu = None
            if stu:
                stu.delete()
                return JsonResponse({'message': 'Record Deleted Successfully!'})
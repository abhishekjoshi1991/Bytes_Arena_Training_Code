from django.shortcuts import render
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer
from rest_framework import viewsets
from rest_framework import status

# Create your views here.
'''
VIEW SET: it is set of related views in a single class
Advantages:
repeated logics can be combined into single class
can use routers to deal with URL configs (paths)

VIEW SET provides following actions

list() -- to get all records
retrieve() -- get single record
create() -- create record
update() -- update record
partial_update() -- update record partially
destroy() -- delete record

some attributes available in viewsets methods are
basename
action
detail
suffix
name
description
'''

class StudentViewSet(viewsets.ViewSet):
    def list(self, request):
        print('basename',self.basename) # basename defined in urls.py
        print('action',self.action) # method that is called
        print('detail',self.detail)
        print('suffix',self.suffix)
        print('name',self.name)
        print('description',self.description)
        stu = Student.objects.all()
        serializer = StudentSerializer(stu, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        id = pk
        if id:
            stu = Student.objects.get(id=id)
            serializer = StudentSerializer(stu)
            return Response(serializer.data)

    def create(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Data Created'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        id = pk
        if id:
            stu = Student.objects.get(id=id)
            serializer = StudentSerializer(stu, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'msg':'record is updated'})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        id = pk
        if id:
            stu = Student.objects.get(id=id)
            serializer = StudentSerializer(stu, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'msg': 'record is updated partially'})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        id = pk
        if id:
            stu = Student.objects.get(id=id)
            if stu:
                stu.delete()
                return Response({'msg':'record is deleted'})
            else:
                return Response({'msg':'id not present'})
from .models import Student, Post
from rest_framework import serializers
from django.contrib.auth.models import User

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields ='__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields ='__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields ='__all__'
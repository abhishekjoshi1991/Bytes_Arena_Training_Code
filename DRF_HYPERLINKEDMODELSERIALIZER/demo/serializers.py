from .models import Student
from rest_framework import serializers

class StudentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Student
        fields =['id', 'url', 'name', 'city', 'roll']


    '''
    here url field automatically included when we inherit from hyperlinked model serializer
    '''
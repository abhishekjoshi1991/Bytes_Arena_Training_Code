from rest_framework import serializers
from .models import Student

# method 1: using serializers.Serializer, we need to recreate all the fields of model again
# in this we need to write create and update functions for apis, that don't need in modelserializer
# class StudentSerializer(serializers.Serializer):
#     name = serializers.CharField(max_length=20)
#     roll = serializers.IntegerField()
#     city = serializers.CharField(max_length=20)


# method 2: using serializers.ModelSerializer: will automatically generate a set of fields
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__' # or we can give list of fields

    # Field level validation
    # defined as validate_fieldtovalidate
    # method automatically called when is_valid() is called on serializer in views
    # to run this send data with POST method in postman and pass roll >=200
    def validate_roll(self, value):
        if value >= 200:
            raise serializers.ValidationError('Seat Full')
        return value


    # Object level validation:
    # When we need to access multiple fields, then we use object level validation
    # to use this, use validate function
    def validate(self, data):
        name = data.get('name')
        city = data.get('city')
        if not name.isalpha() or not city.isalpha():
            raise serializers.ValidationError('Name/City must not contain digit')
        return data

    # Using Validators
    # we can pass custom function as a validators inside field definition

    '''
    def start_with_r(value):
        if value[0].lower() != 'r':
            raise serializers.ValidationError('Name should start with R')
    
    # pass this function as validator in field defintion        
    class StudentSerializer(serializers.Serializer):
        name = serializers.CharField(max_length=20, validators=[start_with_r])
        roll = serializers.IntegerField()
        city = serializers.CharField(max_length=20)
    '''

'''
In ModelSerializer:

as we are not creating new field definition again in ModelSerializer then how we can pass
new attribute to that field or validators to that field,

for that only that field we can again rewrite in class, means

def start_with_r(value):
    if value[0].lower() != 'r':
        raise serializers.ValidationError('Name should start with R')

class StudentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(read_only=True, validators=[start_with_r]) # here this field is written again
    class Meta:
        model = Student
        fields = '__all__'

or we can also write as
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
        read_only_fields = ['name']
        
or we can also write as
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
        extra_kwargs = {'name':{'read_only':True}}
'''



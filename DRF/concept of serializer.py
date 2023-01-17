# Serializer:

'''
In DRF, serializers convert complex dat types like model instances to python native object
than can be easily rendered to json


also responsible for deserialization, convert data to complex data types after validating the
incoming data
'''

'''

django model(data from db) --> serializer --> python native data --> render to --> json data --> client 

client--> json data --> deserializer --> django models

serialization example:
1. stu=Student.object.get(id=1) --> serializer = StudentSerializer(stu) --> JSONRendered().render(serializer.data)
2. using JsonResponse(): use to give json output , first parameter to this function must be dictionary if parameter 
safe = True which is set to true by default, if set=False then other than dictionary can be passed
'''

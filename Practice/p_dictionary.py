# dictionary

'''
dictionary has identifier called as 'Keys' (same as index position of list)
to fetch values

dictionary can be indexed based on keys

dictionary values are mutable that means we can change the value at
particular key and not keys are immutable

dictionary is unordered structure

dictionary have uniques keys, if we assign two keys with same name then,
it will fetch recent one

keys are case sensitive

keys are taken as immutable objects like int,float,str,tuple
but for values any object can be taken

values can be duplicated but keys must be unique
'''

student = {'name':'A', 'age':30,'courses':['maths','geo']}
print(student['courses'])

# if key not present and tried to access it then it thows error
# to avoid this get method is used
print(student.get('name'))
print(student.get('marks'))
print(student.get('marks', 'Not Found')) # default value to printed if not found

student['email'] = 'a@gmail.com'
print(student)

student['age'] = 20
print(student) # if key present then updates value

student.update({'name':'B', 'age':25})
print(student)

# delete key
del student['age']
print(student)

# pop method
student.pop('courses') # can be assigned to variable
print(student)

# loop though dict
for key, value in student.items():
    print(key)
    print(value)
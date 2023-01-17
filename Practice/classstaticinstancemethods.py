
class Student:
    school = 'Abhishek' #class variable
    def __init__(self,m1,m2,m3):
        self.m1 = m1
        self.m2 = m2
        self.m3 = m3

    def avg(self):  # object/ instance method
        return (self.m1+self.m2+self.m3)/3

    @classmethod
    def school_name(cls): #this is class method, as decorator is placed, cls parameter generally taken for class method
        return cls.school  # using class variable here, we can use any variable

    @staticmethod
    def info():  # this is static method
        print('Hello')

s1=Student(20,30,40)

#calling instance methods
print('Calling instance methods')
print(s1.avg())
#print(Student.avg())  this will give an error, we can not called instance method by class name
#but we can do as follow
print(Student.avg(s1))

print('\n')
print('calling class methods')
# we can call class methods by object also as below
print(s1.school_name())
# But to call class method by class name
# print(Student.school_name()) , this will give an error
# to call method, by class name, we need to classmethod decorator
# using this decorator, we can call method using class name
print(Student.school_name())

print('\n')
print('calling static methods')
print(s1.info()) # will throw an error if decorator is commented

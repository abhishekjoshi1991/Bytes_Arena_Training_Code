def func1(a):
    return 'Hello1'

def func1(a,b):
    return 'Hello2'

def func1(a,b,c):
    return 'Hello3'

# print(func1(10))
# print(func1(10,20))
print(func1(10,20,30))

# with default arguments
class Student:
    def hello(self,name='abhi',roll=111):#func with default args
        self.roll=roll
        self.name=name
        print('Name:', self.name,'and','roll:',self.roll)

s1=Student()
print(s1.hello())
print(s1.hello('s'))
print(s1.hello('amit',200))

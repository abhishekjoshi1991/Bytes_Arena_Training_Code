# special/magic/dunder methods
class Employee:
    def __init__(self, fname, lname):
        self.fname = fname
        self.lname = lname
        self.email = fname + '.' + lname + '@gmail.com'

    # repr(obj) calls __repr__ method
    # print(obj) calls __str__ method
    # def __str__(self):
    #     print('Hello')

e1 =Employee('abhi','joshi')
print(e1)


# without repr and str method, print(obj) will give like <__main__.Employee object at 0x7fc7e3a8bc10>
# our class must have at least repr method to represent object, preference is given __str__ method, if not found then __repr__

class Emp:
    def __init__(self, fname, lname):
        self.fname = fname
        self.lname = lname
        self.email = fname + '.' + lname + '@gmail.com'

    # repr(obj) calls __repr__ method
    # print(obj) calls __str__ method
    def __repr__(self):
        return 'Emp({},{})'.format(self.fname,self.lname)

print('with __repr__ method')
e1 = Emp('abhi', 'joshi')
print(e1)


class E:
    def __init__(self, fname, lname):
        self.fname = fname
        self.lname = lname
        self.email = fname + '.' + lname + '@gmail.com'

    def __repr__(self):
        return 'Emp({},{})'.format(self.fname,self.lname)

    def __str__(self):
        return 'Emp({} - {})'.format(self.fname,self.lname)

# if both methods are present then it will access __str__ for print
print('with __str__ method')
e = E('abhi', 'joshi')
print(e)  # e.__str__()


# Operator Overloading
class Person:
    def __init__(self, age):
        self.age = age

    def __add__(self, other): # add method behaves as substraction
        return self.age - other.age

p1 = Person(50)
p2 = Person(20)
print(p1+p2)
# or
print(p1.__add__(p2))

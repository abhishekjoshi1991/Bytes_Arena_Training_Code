'''to set and get this private variables (which is not possible by regular calling them)
we can use getter and setter(get and set method)'''

class Employee:
    def __init__(self, name, age):
        self.__name = name
        self.__age = age

    def get_name(self):
        return self.__name  # can be accessible inside of class

    def set_name(self, newname):
        self.__name = newname

    def get_age(self):
        return self.__age  # can be accessible inside of class

    def set_age(self, newage):
        self.__age = newage

e1 = Employee('abhishek', 30)

# set new name for object e1
e1.set_name('advik')

# set new age for object e1
e1.set_age(35)

# get name and age
print(e1.get_name())
print(e1.get_age())

'''so encapsulation basically binds with getter and setter method'''

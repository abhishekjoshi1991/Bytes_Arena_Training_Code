# Encapsulation:

'''
it is process of hiding the data (variables) outside of class
say we have car class , in that we can change the speed of car from outside
of class as
'''

class Car:
    def __init__(self, speed):
        self.speed = speed

ford = Car(200)
print(ford.speed)

# change speed of car
ford.speed = 300

print(ford.speed)

'''In above example we can see that, we are to change speed of car outside of class
using ford.speed, but what if we want to protect speed attribute so that we can not 
change the speed of car outside of class, in that case encapsulation is used.

for that we need to add __ before attribute name'''

class NewCar:
    def __init__(self, acceleration):
        self.__acceleration = acceleration

newcar = NewCar(100)
# print(newcar.__acceleration) # we get attribute error

'''similarly private methods are not accessible outside of class'''

class Person:
    def __init__(self, fname, lname):
        self.fname = fname
        self.lname = lname

    def __displayinfo(self):
        return self.fname + self.lname

p1 = Person('abhishek', 'joshi')
# print(p1.__displayinfo())


'''we can get these private variables by using them in init function, so that 
way as they are used in class itself they can be accessed so'''
class Employee:
    __nation = 'india'

    def __init__(self):
        print(self.__nation)
        print(self.__displaypay())

    def __displaypay(self):
        return 25000

e = Employee()


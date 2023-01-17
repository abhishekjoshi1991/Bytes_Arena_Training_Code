from abc import ABC, abstractmethod

# Abstract class
'''
class which is inherited from ABC class from abc module is abstract class

Abstract class can have:
1. abstract methods: (identified by @abstractmethod decorator)--> it is method with pass statement
2. concrete method: regular method

we can not create objects from abstract class
'''
class Car(ABC):
    @abstractmethod
    def show(self):
        pass

# c = Car(), will give error as  Can't instantiate abstract class Car with abstract method show

# Abstract Method:
'''Abstract method is one which is redefined in child class as per the requirement.
That means in other class same method must be present with other functionality'''

class Car(ABC):
    @abstractmethod
    def show(self):  # this abstract method as decorator is used and it is without definition(pass)
        pass

class Ford(Car):
    def show(self): # here shoe method which is abstract method in parent class is redefined with other functionality
        print('this is ford car')

f = Ford()
f.show()


# Concrete Method:
'''Concrete method is one whose functionality is defined in abstract class itself'''

class Man(ABC):
    def walk(self):
        print('Man can walk')  # this is concrete method, as pass statement is not used


'''
Important Points:
1. objects can not be created from abstract class
2. abstract class can have abstract methods and concrete methods
3. abstract method of abstract class must be defined in child class

Abstract class used when there are some common features shared by all objects
Like AirForce, Navy, Army shares same gun ak-47, and these three are work in different areas
'''
class Force(ABC):
    @abstractmethod
    def area(self):
        pass
    def gun(self):
        print('Gun AK-47')

class Airforce(Force):
    def area(self):
        print('Area: Sky')

class Navy(Force):
    def area(self):
        print('Area: Water')

class Army(Force):
    def area(self):
        print('Area: Land')

airforce = Airforce()
navy = Navy()
army = Army()

airforce.gun()
airforce.area()

navy.gun()
navy.area()

army.gun()
army.area()




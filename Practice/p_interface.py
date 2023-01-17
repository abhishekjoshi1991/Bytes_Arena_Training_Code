# Interface

'''concept is same as abstract class
if abstract class contains only abstractmethod and not concrete methods then
it is called as interface

interface is used when all features need to implemented differently for different objects

all abstract methods must be redefined in child classes
'''

from abc import ABC, abstractmethod
class Person:
    @abstractmethod
    def walk(self):
        pass

    @abstractmethod
    def talk(self):
        pass

class Child(ABC):
    def walk(self):
        print('walking')

    def talk(self):
        print('talking')

p = Child()
p.walk()
p.talk()

'''here all abstract methods are redefined in child class'''


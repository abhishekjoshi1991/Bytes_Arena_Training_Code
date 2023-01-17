# Regular Method/Instance Method, Class Method and Static Method

# By default regular methods/instance method takes instance as a first argument i.e. self,
# to take class as a first argument, classmethod decorator is used

# if we run debugger, try to debug in full_name method, if we type or print self there, we get like <__main__.Employee object at 0x7f9e61e6ffd0>
# that's mean it is employee's object
# now if use classmethod decorator above that function, and type self again now we get <class '__main__.Employee'> that is class itself
# instead of self, cls is used as convention
from datetime import datetime

class Employee:
    # class variable
    raise_amount = 1.05
    no_of_employees = 0

    def __init__(self, fname, lname, pay):
        self.fname = fname
        self.lname = lname
        self.pay = pay
        self.email = fname + '.' + lname + '@gmail.com'
        Employee.no_of_employees += 1

    # instance method
    def full_name(self):
        return '{} {}'.format(self.fname, self.lname)

    # instance method
    def apply_raise(self):
        self.pay = int(self.pay * self.raise_amount)

    # class method
    @classmethod
    def set_raise_amount(cls, amount):
        # cls is class itself
        print('---------------cls',cls)
        cls.raise_amount = amount

    # static method
    @staticmethod
    def is_monday(day):
        if day.lower() == 'monday':
            return True
        return False

emp_1 = Employee('abhishek','joshi',25000)

# calling instance method by instance
print('Instance Method')
print(emp_1.full_name())

# calling instance method by class
# instance method can not be called by class directly as Employee.full_name --> will give argument error
# instead we need to pass instance, so that it can be called by class
print(Employee.full_name(emp_1))

# ----------------------------------------------------------------------------------------------------------------------

# before calling class method
print('#'*50)
print('Class Method')
print(Employee.raise_amount)
print(emp_1.raise_amount)

# calling class method by class
Employee.set_raise_amount(2.5) # increase raise amount to 2.5 using classmethod
print(Employee.raise_amount)
print(emp_1.raise_amount)

# calling classmethod by instance
'''classmethod can be called by instance as well, but it is not a practice
though it is called from instance, it changes attribute raise_amount at class level and not on instance level
so thus in output emp_1.raise_amount and Employee.raise_amount gives same result, as raise_amount is changed at class level'''

emp_1.set_raise_amount(3.5)
print(emp_1.raise_amount)
print(Employee.raise_amount)

# ----------------------------------------------------------------------------------------------------------------------

# classmethod as an alternative constructor of object
print('Classmethod as an alternative constructor')
class Manager:
    def __init__(self, name, email, pay):
        self.name = name
        self.email = email
        self.pay = pay

    @classmethod
    def from_string(cls, data):
        name, email, pay = data.split('-')
        obj = cls(name,email,pay) # same as Manager(name,email,pay)
        print(obj)
        return obj


manager_str = 'abhishek-abhijsh61@gmail.com-50000'
new_manager = Manager.from_string(manager_str)
print(new_manager.name) # this attributes are accessible because manager object is created
print(new_manager.email)
print(new_manager.pay)


# ----------------------------------------------------------------------------------------------------------------------
# static methods:
# static method does not take instance and class as an argument, they are bound to class in some logical way
# in Employee class, is_monday() method does not take any argument as self or cls

# calling static method by class
print('#'*50)
print('Static Method')
print(Employee.is_monday('Monday'))

# calling static method by instance.
print(emp_1.is_monday('Monday'))
# Note: without staticmethod decorator, above line will throw argument error, as extra argument is provided


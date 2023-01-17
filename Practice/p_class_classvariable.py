
class Employee:
    def __init__(self, fname, lname, pay):
        self.fname = fname
        self.lname = lname
        self.pay = pay
        self.email = fname + '.' + lname + '@gmail.com'

    def full_name(self):
        return '{} {}'.format(self.fname, self.lname)

# Note: Instance variable can not be accessed by class name

e1 = Employee('abhishek','joshi',25000)
e2 = Employee('mark','demo',30000)

# try:
# Employee.fname --> will give error AttributeError: type object 'Employee' has no attribute 'fname'

# to check what methods and attributes are available with obj, use dir
print(dir(Employee)) # method full_name is accessible to class but not fname, lname, pay
print(dir(e1))

# -----------------------------------------------------------------------

# Using class variables

class Emp:
    # class variable
    raise_amount = 1.05
    no_of_employees = 0

    def __init__(self, fname, lname, pay):
        self.fname = fname
        self.lname = lname
        self.pay = pay
        self.email = fname + '.' + lname + '@gmail.com'
        Emp.no_of_employees += 1

    def full_name(self):
        return '{} {}'.format(self.fname, self.lname)

    def apply_raise(self):
        self.pay = int(self.pay * self.raise_amount) # better to use self.raise_amount by that we can access objects own attribute

# for attribute that remain common across multiple instance like no_of_employees, we can access them by class name, Emp.no_of_employees

emp_1 = Emp('abhishek','joshi',25000)
emp_2 = Emp('mark','demo',25000)
print(dir(emp_1))
print(dir(emp_2))
print(dir(Emp))


# Now class variable can be accessed by ClassName and Instance as well
print(Emp.raise_amount)
print(emp_1.raise_amount) # raise_amount here is class's attribute and not of instance
print(emp_2.raise_amount)

# when we access attribute on instance, it first checks whether
# that attribute is present in that instance, if not checks in
# class or in inherited class
# so if we check namespaces of class and instance
print('*'*30)
print(Emp.__dict__)
print(emp_1.__dict__)
print(emp_2.__dict__)


# Now to add raise_amount in instance's namespace, i.e. we can assign new amount to instance
emp_1.raise_amount = 2
print(Emp.__dict__)
print(emp_1.__dict__)
print(emp_2.__dict__)

print(Emp.raise_amount)
print(emp_1.raise_amount) # object accessing its own attribute rather than class as it has it in namespace
print(emp_2.raise_amount) # object accessing its class's attribute as it does not has it in namespace

print(Emp.no_of_employees)

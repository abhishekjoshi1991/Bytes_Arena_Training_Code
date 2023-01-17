# creating classes

# class with no attributes and method
class Emp:
    pass

# creating an instance
emp_1 = Emp()
emp_2 = Emp()

print(emp_1)  # emp class object


# Instance Variables:
# Instance variables can be created manually for above class as
emp_1.first_name = 'abhishek'
emp_1.last_name = 'joshi'
emp_1.email = 'abhijsh61@gmail.com'

emp_2.first_name = 'mark'
emp_2.last_name = 'demo'
emp_2.email = 'markdemo@gmail.com'

print(emp_1.email)
print(emp_2.email)

# -----------------------------------------------------------------------

# Instead of this, __init__ method is used to create instance variable


class Employee:
    def __init__(self, first_name, last_name, pay):
        self.first_name = first_name
        self.last_name = last_name
        self.pay = pay
        self.email = first_name + '.' + last_name + '@gmail.com'

# creating instance of Employee class
emp1 = Employee('abhishek','joshi',25000)
emp2 = Employee('mark','demo',30000)

print(emp1.email)
print(emp2.email)

# -----------------------------------------------------------------------

# Creating the methods


class EmployeeNew:
    def __init__(self, fname, lname, pay):
        self.fname = fname
        self.lname = lname
        self.pay = pay
        self.email = fname + '.' + lname + '@gmail.com'

    def full_name(self):
        return '{} {}'.format(self.fname, self.lname)

# creating instance of EmployeeNew class
e1 = EmployeeNew('abhishek','joshi',25000)
e2 = EmployeeNew('mark','demo',30000)

# calling method from instances
print(e1.full_name())
print(e2.full_name())

# calling method from class name
# class name does not go as self inside function, instead we need to pass instance/object as a self manually
print(EmployeeNew.full_name(e1))


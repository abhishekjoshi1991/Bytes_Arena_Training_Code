#inheritance

# Parent Class
class Employee:
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

# Child/SubClass
class Developer(Employee):
    pass

# Now even if developer class is empty, its object have access to all attribute and methods from parent class

d1 = Developer('abhi','joshi',30000)
print(d1.fname)
print(d1.lname)
print(d1.pay)


# to get more help on developer class, use as
print(help(Developer))

# Now apply_raise on developer object
d1.apply_raise()
print(d1.pay)

# Now to apply different raise_amount on developer, we can simply do

class Developer(Employee):
    raise_amount = 3.5

# Now apply_raise on developer object
d1.apply_raise()
print(d1.pay)

# We can pass more information to developer/inherited class, than parent class taking
# so if need to pass prog_lang to developer class we can do as

class Dev(Employee):
    def __init__(self,fname,lname,pay,lang):
        self.lang = lang
        super(Dev, self).__init__(fname,lname,pay) # so for construction pass fname, lname, lang to parent class
        # or alternatively
        # super().__init__(fname,lname,pay)
        # or
        # Employee.__init__(self,fname,lname,pay)

# create obj
dev1= Dev('abhishek','joshi',28000,'python')
dev2= Dev('mark','demo',50000,'java')
print(dev1.fname)
print(dev1.lname)
print(dev1.pay)
print(dev1.lang)

class Manager(Employee):
    def __init__(self, fname, lname, pay, employees=None):
        super(Manager, self).__init__(fname, lname, pay)
        if employees is None:
            self.employees = []
        else:
            self.employees = employees

    def add_emp(self, emp):
        if emp not in self.employees:
            self.employees.append(emp)

    def remove_emp(self, emp):
        if emp in self.employees:
            self.employees.remove(emp)

    def get_employees(self):
        for emp in self.employees:
            print('====>', emp.full_name())

m1 = Manager('robert','bosch',50000, [dev1])
m1.add_emp(dev2)
m1.get_employees()


# Now to get whether class is subclass of other class use issubclass method
# Now to get whether object is instance of class use isinstance method

print('isinstance and issubclass')
print(isinstance(m1, Manager))
print(isinstance(m1, Employee)) # it is instance of employee as well
print(isinstance(m1, Developer))

print(issubclass(Developer, Employee))
print(issubclass(Developer, Manager))


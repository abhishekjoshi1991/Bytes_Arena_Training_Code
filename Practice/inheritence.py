class Employee:
    count=0
    nation='india'
    def __init__(self,name,salary=20000):
        self.name=name
        self.salary=salary
        Employee.count+=1
    def display_emp(self):
        print('name:',self.name)
        print('salary:',self.salary)
    def emp_count(self):
        print('totalEmp:',self.count)
        print('Nation:',self.nation)

class Programmer(Employee):
    def __init__(self,name,salary,project):
        Employee.__init__(self,name,salary)#or super(Programmer,self).__init__(name,salary)
        self.project=project
    def display_employee(self):
        Employee.display_emp(self)#or super(Programmer,self).display_emp()
        print('Project:',self.project)

class Manager(Employee):
    pass

p1=Programmer('abhi',25000,'PHP')
print(p1.display_employee())
class Employee:
    count=0
    nation='india'
    def __init__(self,name,salary=20000):
        self.name=name
        self.salary=salary
        Employee.count += 1
    def display_emp(self):
        print('name:',self.name)
        print('salary:',self.salary)
    def emp_count(self):
        print('totalEmp:',self.count)
        print('Nation:',self.nation)

class Programmer(Employee):
    def __init__(self,name,salary,project):
        Employee.__init__(self,name,salary)
        self.project=project
    def display_emp(self):
        print('hello')

p2=Programmer('jose',25655,'IT')
print(p2.display_emp())
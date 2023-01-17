# sorted function on object

class Emp:
    def __init__(self, name, age, salary):
        self.name = name
        self.age = age
        self.salary = salary
    def __repr__(self):
        return '({},{},{})'.format(self.name,self.age, self.salary)

e1 = Emp('abhi',32,25000)
e2 = Emp('harsh',20,35000)
e3 = Emp('joe',52,15000)
print(e1)
employees =[e1,e2,e3]
# print(sorted(e)) will give error directly

def e_sort(emp):
    return emp.name # try with emp.age, emp.salary
print(sorted(employees, key=e_sort))
# or
print(sorted(employees, key=lambda e:e.age))

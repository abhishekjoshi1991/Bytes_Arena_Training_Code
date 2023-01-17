class Student:
    def __init__(self,marks):
        self.marks=marks
    def __add__(self,other): #s1+s2 ==> Student.__add__(s1,s2) ==> s1.marks+s2.marks
        return self.marks+other.marks

s1=Student(10)
s2=Student(200)
print(s1+s2)
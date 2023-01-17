class Circle:
    def __init__(self,radius):
        self.radius=radius
    def area(self):
        return 3.142*self.radius*self.radius #need to pass self.radius as radius is local to init
    def perimeter(self):
        return 2*3.142*self.radius

c1=Circle(10)
print(c1.area())
print(c1.perimeter())


# also
class Circle1:
    pi=3.142
    def __init__(self,radius1):
        self.radius1=radius1
    def area(self):
        return Circle1.pi*self.radius1*self.radius1
    def perimeter(self):
        return 2*Circle1.pi*self.radius1

c2 = Circle1(100)
print(c2.perimeter())
print(c2.area())
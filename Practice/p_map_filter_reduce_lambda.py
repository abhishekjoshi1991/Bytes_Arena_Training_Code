from functools import reduce

# zip
l1=[1,2,3,4,5]
l2=[10,20,30]
l3=['a','b','c','d','e','f']
print(list(zip(l1,l2)))#it will zip till smallest length of iterable here l2
print(list(zip(l2,l3)))
print(dict(zip(l2,l3)))

# map
print(list(map(lambda x:x*x, range(5))))
def mysum(a,b):
    return a+b
print(list(map(mysum,range(1,11),range(11,21))))

#program to print maximum as per index position from two lists
l1=[1,3,2,3,5,6,7]
l2=[33,4,5,6,7,3,2]
print(list(map(max,zip(l1,l2))))

#lambda
print(list(map(lambda x,y:max(x,y),[1,3,2,3,5,6,7],[33,4,5,6,7,3,2])))

# reduce
print(reduce(lambda x,y:x+y,[1,10,2,20,1,2]))

# filter
print(list(filter(lambda p:p%2==0, range(10))))
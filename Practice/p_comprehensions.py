# list comprehension
print([n*n for n in range(5)])
print([x**2 if x%2==0 else x**3 for x in range(1,11)])
print([x**2 for x in range(1,11) if x%2==0])
print([(letter, num) for letter in 'abc' for num in 'pqr'])

# set comprehension
l1=[1,2,3,2,2,3,5,3,5,3,5]
print({x**2 for x in l1})

# generator comprehension
print((x**2 for x in range(1,10)))#throws object
a=(x**2 for x in range(1,10))
print(list(a))

#dict comprehension
print({x:x**2 for x in range(1,11)})
names =['bruce', 'lionel', 'mark']
surname = ['lee','messi','tolan']
print({name:hero for name,hero in zip(names, surname)})

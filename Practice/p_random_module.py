import random
print(random.randint(0,5))#to print random int from 0 to 5
print(random.random())#to print float between 0 to 1
print(random.random()*100)#to print float between 0 to 100
print(random.choice([1,2,3]))#to choose random element from iterable
l1=[1,23,4,5,6,5]
print(random.shuffle(l1))#to shuffle the list not tuple
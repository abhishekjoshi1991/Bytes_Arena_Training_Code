# Lists
''' list may contain
DataTypes like Integers, Strings etc. Lists are mutable,
and hence, they can be altered even after their creation.
List in Python are ordered and have a definite count.

A list may contain duplicate values with their distinct positions and hence,
multiple distinct or duplicate values can be passed as a sequence
at the time of list creation.
'''

courses = ['math', 'physics', 'geo', 'science']
print(len(courses))
print(courses[0]) # indexing of list
print(courses[-2]) # indexing of list
print(courses[0:3]) # slicing of list

# list methods
courses.append('art')
print(courses)

courses.insert(2, 'bio') # insert bio at index 2
print(courses)

courses.extend(['edu','algebra'])
print(courses)

courses.remove('math')
print(courses)

courses.pop() # can be assigned to variable
print(courses)

courses.reverse()
print(courses)

# sort method makes changes in list in place
courses.sort()
print(courses)

courses.sort(reverse=True)
print(courses)

# sorted function
a = [10,20,2,30,5,7,9]
print(sorted(a))
print(sorted(a, reverse = True)) 
print(a) # does not make changes in list

print(a.index(20)) # index of character from list

# in operator
print(30 in a)
print(300 in a)

# enumerate function
for index, value in enumerate(a):
    print(index, value)

# join method
courses_string = ','.join(courses)
print(courses_string)


# Tuples

'''
tuple is collection of different objects(strings, int, list, etc.)
tuple is ordered sequence
tuples are immutable i.e. does not support item assignment'''

list1 = ['a','b','c','d']
list2 = list1
list1[0] ='aa'
print(list1)
print(list2)  # both list get altered

t = (10,20,30,40,50)
print(type(t))

# tuple methods
print(t.count(40))
print(t.index(40))
print(sorted(t))

# sets
#1. using string
print(set('name'))#will give unordered strings of individual elements from string

#2.set from list
print(set([1,2,3,4,5,6,6,1]))

#3.empty set
print(set())

s2={5,6,7,8}
s3={5,8,9,10}
print(s2.union(s3)) # all unique values from both
print(s2.intersection(s3)) # common values from both
print(s2.difference(s3)) # element present in s2 but not in s3

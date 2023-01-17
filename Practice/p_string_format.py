# string format

person = {'name': 'Jenn', 'age': 23}

sentence = 'My name is ' + person['name'] + ' and I am ' + str(person['age']) + ' years old.'
print(sentence)

sentence = 'My name is {} and I am {} years old.'.format(person['name'], person['age'])
print(sentence)

sentence = 'My name is {0} and I am {1} years old.'.format(person['name'], person['age'])
print(sentence)


sentence = 'My name is {0[name]} and I am {0[age]} years old.'.format(person)
print(sentence)

tag = 'h1'
text = 'This is a headline'

sentence = '<{0}>{1}</{0}>'.format(tag, text)
print(sentence)

class Person():

    def __init__(self, name, age):
        self.name = name
        self.age = age

p1 = Person('Jack', '33')

sentence = 'My name is {0.name} and I am {0.age} years old.'.format(p1)

print(sentence)

for i in range(5):
    print('number is {:02}'.format(i))
for i in range(5):
    print('number is {:03}'.format(i))

pi = 3.1425
print('number is {:.3f}'.format(pi))

n = 10000000
print('number is {:,}'.format(n))
print('number is {:,.2f}'.format(n))
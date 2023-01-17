# Property Decorator, setter

class A:
    def __init__(self, fname, lname):
        self.fname = fname
        self.lname = lname
        self.msg = self.fname + ' ' + self.lname


a1 = A('abhishek', 'joshi')
print("first name= ", a1.fname)
print("last name= ", a1.lname)
print("message= ", a1.msg)

a1.fname = 's'
print("first name= ", a1.fname)
print("last name= ", a1.lname)
print("message= ", a1.msg)

'''
So in the above example, even after changing fname to another, our msg variable value is printing the same as before:
this is because if we change the value of an attribute, other attributes derived from that attribute (here msg) won't change

So to avoid this, we can create one method and in that we can return the msg we want like below,
'''


class A:
    def __init__(self, fname, lname):
        self.fname = fname
        self.lname = lname

    def msg(self):
        return self.fname + ' ' + self.lname

print('\n')
a1 = A('abhishek', 'joshi')
print("first name= ", a1.fname)
print("last name= ", a1.lname)
print("message= ", a1.msg())

a1.fname = 's'
print("first name= ", a1.fname)
print("last name= ", a1.lname)
print("message= ", a1.msg())

'''Now we get the correct output, but to get this we had to change a1.msg  to a1.msg() as msg in the now method instead of attribute
so we can use property decorator
'''

print('\n')


class A:
    def __init__(self, fname, lname):
        self.fname = fname
        self.lname = lname

    @property
    def msg(self):
        return self.fname + ' ' + self.lname


a1 = A('abhishek', 'joshi')
print("first name= ", a1.fname)
print("last name= ", a1.lname)
print("message= ", a1.msg)

a1.fname = 's'
print("first name= ", a1.fname)
print("last name= ", a1.lname)
print("message= ", a1.msg)


'''if we try to set msg, We will get error as : AttributeError: can't set attribute msg'''
a1 = A('abhishek', 'joshi')

# a1.msg = 'advik joshi'


'''to overcome this, we can use setter method'''


class A:
    def __init__(self, fname, lname):
        self.fname = fname
        self.lname = lname

    @property
    def msg(self):
        return self.fname + ' ' + self.lname

    def setter(self, msg):
        incoming_msg = msg.split(' ')
        self.fname = incoming_msg[0]
        self.lname = incoming_msg[-1]

print('\n')
a1 = A('abhishek', 'joshi')
print("first name= ", a1.fname)
print("last name= ", a1.lname)
print("message= ", a1.msg)

a1.setter('advik joshi')  #→ instead of a1.msg = ‘
print("first name= ", a1.fname)
print("last name= ", a1.lname)
print("message= ", a1.msg)

'''instead of a1.setter() to use a1.msg only we can do'''
class A:
    def __init__(self, fname, lname):
        self.fname = fname
        self.lname = lname

    @property
    def msg(self):
        return self.fname + ' ' + self.lname

    @msg.setter
    def msg(self, msg):
        incoming_msg = msg.split(' ')
        self.fname = incoming_msg[0]
        self.lname = incoming_msg[-1]

print('\n')
a1 = A('abhishek', 'joshi')
print("first name= ", a1.fname)
print("last name= ", a1.lname)
print("message= ", a1.msg)
a1.msg = 'a joshi'
print("first name= ", a1.fname)
print("last name= ", a1.lname)
print("message= ", a1.msg)


'''deleter: '''

class A:
    def __init__(self, fname, lname):
        self.fname = fname
        self.lname = lname

    @property
    def msg(self):
        return self.fname + ' ' + self.lname

    @msg.deleter
    def msg(self):
        print('deleter called')
        self.fname = None
        self.lname = None

a1 = A('abhishek', 'joshi')
del a1.msg


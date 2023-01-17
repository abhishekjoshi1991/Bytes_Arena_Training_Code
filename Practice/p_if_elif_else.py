# if elif else

if True:
    print('Condition true')

lang ="java"
if lang == 'python':
    print('course is present')
else:
    print('course deleted')


if lang == 'python':
    print('python is present')
elif lang == 'java':
    print('java is present')
else:
    print('course deleted')

# and or not
user = 'admin'
logged_in = True
if user == 'admin' and logged_in:
    print('log in success')
else:
    print('bad cred')

if not logged_in:
    print('pls log in')
else:
    print('welcome home')

# object identity
a = [1,2,3]
b = [1,2,3]

print(a == b)
print(id(a))
print(id(b))
print(a is b)

# False values
'''
False
Zero
Empty sequence [].{},()
None
'''
condition = []
if condition:
    print('conditional true')
else:
    print('conditional false')





# example
total=100
#country='US'
country='AU'
if country=='US':
    if total <=50:
        print('shipping cost is $50')
elif total<=100:
    print('shipping cost is $25')
elif total<=150:
    print('shipping cost is $5')
else:
    print('FREE1')
if country=='AU':
    if total<=50:
        print('shipping cost is $100')
else:
    print('FREE2')
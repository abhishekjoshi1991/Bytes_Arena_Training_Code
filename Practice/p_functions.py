# Functions

def hello_func():
     print('First Function')
hello_func()


def hello_func_1():
    return 'First Function'
print(hello_func_1())
print(hello_func_1().upper())

# function with parameters
def func(msg):
    return 'Hello {}'.format(msg)
print(func('greetings'))

# default arguments
def stud(name,nation='india'):
    return name,nation

print(stud('abhishek'))#default value on nation is printed
print(stud('abhishek','US'))


#args:
def func1(*args):
    print('=====',args)
    return sum(args)

print(func1(10,30,40,50,60))

# kwargs
def keywarg(**kwargs):
    return 'youngest child is '+kwargs['B']

print(keywarg(A='emily',B='Watt',C='Mike'))

## args + kwargs

def comb(*args,**kwargs):
    print('---->',args)
    print('---->',kwargs)
    return 'i want {} {}'.format(args[1],kwargs['food'])
nums = [2,4,5,6,8]
foods = {'food':'carrot','juice':'orange'}
print(comb(*nums,**foods))


# example
month_days = [0,31,28,31,30,31,30,31,31,30,31,30,31]
def is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)
def days_in_month(year, month):
    if not 1 <= month <=12:
        return 'Invalid Month'
    if month == 2 and is_leap(year):
        return 29
    return month_days[month]

print(days_in_month(2021,2))

# generator function
#fibonaaci series with yield statement
def fib(n):
    a,b=0,1
    while a<=n:
        yield a#return will not print all values of sequence
        a,b=b,a+b

for i in fib(8):#so only after iterating over fib we get values
    print(i)
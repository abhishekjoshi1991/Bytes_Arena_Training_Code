try:
    f = open('a.txt','r')
except FileNotFoundError:
    print('File Not Found')


try:
    a = 10/0
    # a = 10/2
except ZeroDivisionError:
    print('divison by error')
else:
    print('else is run')
finally:
    print('finally run')


try:
    a = [10,20,30,40]
    a[5]
except Exception as E:
    print(E)


try:
    f = open('test.txt')
    if f.name == 'test.txt':
        raise Exception
except Exception as E:
    print('Error')
else:
    print('else is run')
finally:
    print('finally run')

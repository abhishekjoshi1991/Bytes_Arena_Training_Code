# variable
import builtins
# LEGB: Local, Enclosing, Global, Built-in

x = 100 # global
def outer():
    x = 'outer x' # enclosing

    def inner():
        x = 'inner x'  # local
        print(x)

    inner()
    print(x)

outer()
print(x)


# use of global keyword
p = 10
def f():
    global p
    p = 20
    print(p)
f()
print(p)


# built in variables and methods
print(dir(builtins))
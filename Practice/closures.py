def outer(msg):
    message = msg

    def inner():
        return message

    return inner


my_func = outer('hi')


print(my_func())
print(my_func())
print(my_func())
print(my_func())
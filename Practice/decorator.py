def make_pretty(func):
    def inner():
        print(func())
        return 'i am decorated'
    return inner

@make_pretty
def ordinary():
    return 'i am ordinary'

print(ordinary())
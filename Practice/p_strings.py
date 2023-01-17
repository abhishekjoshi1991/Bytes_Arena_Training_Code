# strings

print('Hello World')

message = 'Hello python'
print(message)

quoted_msg = "bobby's world"
print(quoted_msg)

quoted_msg_1 = 'bobby\'s world'
print(quoted_msg_1)

# multiline string
var = '''this is multiline
text in python'''
print(var)


# length of string
msg = 'abhishek'
print(len(msg))

# index
print(msg[0])
print(msg[-1])

# slicing
print(msg[1:8])
print(msg[:5])
print(msg[-1:-5:-1])
print(msg[::2])
print(msg[::-1])  # reverse string

# string methods
print(msg.capitalize())
print(msg.upper())
print(msg.count('h'))  # count of letters in string
print(msg.find('h'))  # index of first occurnce
print(msg.find('z'))  # returns -1 if not found

# replace method
lang = "Python Language"
new_lang = lang.replace('Python', 'Java')
print(lang)
print(new_lang)

# string concatenation
msg1 = 'hello'
msg2 = 'greetings'
msg3 = msg1 + ' ' + msg2
print(msg3)

# .format
print('{} {}'.format(msg1,msg2))

# f-string
print(f'{msg1} {msg2} welcome')
print(f'{msg1.upper()} {msg2} welcome')

# dir, list of attributes and methods
print(dir(str))

# help function
print(help(str.capitalize))
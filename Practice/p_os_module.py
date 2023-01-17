import os

print(os.getcwd())

for path, folder, files in os.walk('/home/abhishek/Videos'):
    for file in files:
        if file.split('.')[-1] == 'py':
            print(file)
# file handling

file = open('test.txt', 'r')
data = file.read()
print(file.name)
print(dir(file))
print(data)
file.close()

with open('test.txt', 'r') as f:
    pass
print(f.closed)

with open('test.txt', 'r') as ff:
    data_file = ff.readline()  # read file line by line
    print('-----',data_file)

    data_file = ff.readline()
    print('-----', data_file)


with open('test.txt', 'r') as f:
    data_file = f.read(10)
    print(data_file)


with open('test.txt', 'r') as ff:
    size_to_read = 10
    data_file = ff.read(size_to_read)
    print('====', ff.tell())
    while len(data_file) > 0:
        print(data_file, end='$')
        data_file = ff.read(size_to_read)


# copy file

with open('test.txt', 'r') as file:
    file_data = file.read()
    with open('test_copy.txt', 'w') as fw:
        fw.write(file_data)
nums = [1,2,3,4,5,6]
for num in nums:
    print(num)

# break
print('*'*20)
for n in nums:
    if n == 4:
        break
    print(n)

# continue
print('*'*20)
for n in nums:
    if n == 4:
        print('found')
        continue
    print(n)
print('*'*20)

# nested loops
for i in 'abc':
    for j in 'pqr':
        print(i, j)
print('*'*20)

# range
for x in range(10):
    print(x)
print('*'*20)

# while loop
n1 = 5
while n1<10:
    print('hi')
    n1+=1
    if n1 == 5:
        break
print('*'*20)


# while loop with else
n=1
while n<=5:
    print('square of ',n,'is',n**2)
    n+=1
    if n==3:
        break
else:
    print('successful')

# for loop with else
for i in range(3):
    if i==2:
        break
    print(i)
else:
    print('finish!!')
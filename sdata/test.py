import sqlite3

connection = sqlite3.Connection('employee.db')
print(connection)

cursor_obj = connection.cursor()

# cursor_obj.execute("""CREATE table employee (
#                     name text,
#                     surname text,
#                     age int)""")

names = ['a','b','c','d']
s_names = ['x','y','z','w']
ages = [20,30,40,50]

cursor_obj.execute("SELECT * FROM employee")
print(cursor_obj.fetchmany(3))
connection.commit()
connection.close()
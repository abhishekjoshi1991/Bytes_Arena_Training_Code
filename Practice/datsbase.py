import sqlite3 #step 1
try:
    db = sqlite3.connect('Employee') #step 2, connection object named db
    mycursor = db.cursor() #step3, cursor object named mycursor
    mycursor.execute('''CREATE TABLE if not exists emp
    (empID int NOT NULL,
    empName varchar(80),
    dept text,
    salary int,
    PRIMARY KEY (empID))''') #step 4, use SQL query using cursor object

except Exception as E:
    print('unable to interact with db:',E)

else:
    print('Table created successfully!')

finally:
    db.close() #step 6, closing connection


try:
    db = sqlite3.connect('Employee')
    mycursor = db.cursor()
    data = ((2,'abhishek','IT',25000),(3,'sukanya','PHP',35000), (4,'harsh','surabhi',50000))
    mycursor.execute('''INSERT INTO emp VALUES (1,'mach','HR',45000)''') #to add single row at a time

    mycursor.executemany('''INSERT INTO emp VALUES (?,?,?,?)''',data) #to add multiple data at a time, takes two arguments


except Exception as E:
    print('unable to interact with DB:',E)

else:
    print('worked fine!')
    db.commit()

finally:
    db.close()

    
try:
    with sqlite3.connect('Employee') as db: #no need to use db.close() then in finally
        mycursor = db.cursor()
        mycursor.execute('''SELECT * FROM emp''') #to fetch all data
        #print(mycursor.fetchone()) #to fetch first record, cursor will go at end of first record
        print(mycursor.fetchall()) #to fetch all data, cursor will go at last
        #print(mycursor.fetchmany(2)) #will fetch first two record, here empty as cursor is at last, try using this code one at a time

        #we can also iterate on cursor like infile object
        for each in mycursor:
            print(each)

except Exception as E:
    print('unable to interact with DB:',E)

else:
    print('data fetched successfully!')
    db.commit()
    db.close()
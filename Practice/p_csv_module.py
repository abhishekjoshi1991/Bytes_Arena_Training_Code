import csv

# reading csv file
with open('sample.csv','r') as f:
    csv_reader = csv.reader(f)
    print(csv_reader)
    next(csv_reader) # to skip header rows
    for i in csv.reader(f):
        print(i)



# writing to csv file
with open('sample.csv','r') as f:
    csv_reader = csv.reader(f)

    with open('sample_new.csv', 'w') as new:
        csv_writer = csv.writer(new)
        for line in csv_reader:
            print('---',line)
            csv_writer.writerow(line)
        csv_writer.writerow(['abhi', 'joshi', 'abhijoshi@bogusemail.com']) # manually created record


# reading and writing using dictreader and dictwriter

with open('sample.csv','r') as f:
    csv_dict_reader = csv.DictReader(f)

    for lines in csv_dict_reader:
        print('===',lines)
        print('+++',lines['email'])

# while writing to csv using DictWriter, we need to pass header rowa
with open('sample.csv','r') as f:
    csv_reader = csv.DictReader(f)

    with open('sample_new_new.csv', 'w') as new_file:
        fieldnames = ['first_name', 'last_name', 'email']
        csv_writer = csv.DictWriter(new_file, fieldnames=fieldnames)
        csv_writer.writeheader()
        for line in csv_reader:
            print('---',line)
            csv_writer.writerow(line)
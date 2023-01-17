'''to change format of logs the way that are printed

we can refer the attributes at link
https://docs.python.org/3/library/logging.html#logrecord-attributes

add format option in basicConfig, add attributes separated by colon
'''
import logging
logging.basicConfig(filename='p_logging_with_format',level=logging.DEBUG, format='%(asctime)s:%(levelname)s:%(message)s')
logging.info('addition of 10 and 5 is 15')

class Employee:
    def __init__(self,first,last):
        self.first = first
        self.last = last
        logging.info('Created Employee: {}'.format(self.fullname))

    @property
    def fullname(self):
        return '{} {}'.format(self.first, self.last)

emp1 = Employee('abhishek','joshi')
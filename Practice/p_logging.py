# Logging

import logging
logging.basicConfig(level=logging.DEBUG)

# Logging Levels:
'''
Debug: Information when dignosing the problem
Info: Confirmation for things are working expected
Warning: Indication of something unexpected happen
Error: Software not able to perform certain function
Critical: Program may be unable to continue


Default level of logging is set to warning: means it 
will capture everything that is warning or above(error and critical)

for example
'''
logging.debug('addition of 10 and 5 is 15')
logging.info('addition of 10 and 5 is 15')

'''above will not log anything in console as logging level is set to warning,
and we are trying to log lower level log of debug and info
but
'''
logging.warning('addition of 10 and 5 is 15')

'''but to log this line in debug or info, we need to change logging level
we can do at top of file
logging.basicConfig(level=logging.DEBUG)
'''



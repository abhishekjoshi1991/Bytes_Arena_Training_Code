# Logging Loga to Files

'''To log logs into file'''
import logging
logging.basicConfig(filename='p_logging', level=logging.DEBUG)

logging.debug('addition of 10 and 5 is 15')
logging.warning('addition of 10 and 5 is 15')
logging.info('addition of 10 and 5 is 15')





'''
when we import module, if that module contains logging code, and file in which we
are importing that module also has logging code, then second modules file is created as a log file
means

here as we are importing p_loggers_handlers_2 before logging.basicConfig(level=logging.DEBUG, filename='p_loggers1')
it set the root of logging to file name of p_loggers2 even if we are running first file

to overcome this we use loggers and handlers
'''
import logging
import p_loggers_handlers_2

logger = logging.getLogger(__name__) # to set logger name other than root
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s:%(levelname)s:%(name)s:%(message)s')  # to set logs format
file_handler = logging.FileHandler('p_loggers.log')  # specifying the file name where logs will store
file_handler.setFormatter(formatter) # set above declared format
logger.addHandler(file_handler)

logger.info('logging from first file')


import logging
logger = logging.getLogger(__name__) # to set logger name other than root
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s:%(levelname)s:%(name)s:%(message)s') # to set logs format
file_handler = logging.FileHandler('p_loggers2.log') # specifiying the file name where logs will store
file_handler.setFormatter(formatter) # set above declared format
logger.addHandler(file_handler)

# logging.basicConfig(level=logging.DEBUG, filename='p_loggers2')
logger.info('logging from second file')
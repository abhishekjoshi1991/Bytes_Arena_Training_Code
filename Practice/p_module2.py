import sys
import p_module1
sys.path.append('/home/abhishek/Desktop/')
import my_module_desktop
# or
# import p_module1 as pm

courses = ['geo','maths','physics','history']
print(p_module1.find_index(courses,'history'))

'''
when module is imported, its checked that module in location
sys.path '''
print(sys.path)

'''suppose we want to import module from desktop, we get 
module not found error as desktop path is not present in
sys.path. we can append path to sys.path '''

print(my_module_desktop.method1())
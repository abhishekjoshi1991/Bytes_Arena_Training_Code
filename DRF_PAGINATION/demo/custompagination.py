from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination

class CustomPagePagination(PageNumberPagination):
    page_size = 3
    '''
    individual page can be accessed by link like
    http://127.0.0.1:8000/studentapi/?page=4
    
    instead of variable page, custom variable/name can be set by using
    page_query_param attribute, so that now we can access
    
    http://127.0.0.1:8000/studentapi/?mypage=4
    '''
    # page_query_param = 'mypage'


    '''
    now even if we have defined max records per page as 3, we can change
    records to display per page by passing additional query parameter as
    page_size_query_param
    
    http://127.0.0.1:8000/studentapi/?mypage=2&records=8
    '''
    # page_size_query_param = 'records'

    '''
    to limit max no of records per page, we can set max_page_size attribute,
    so even if we tried to access
    
    http://127.0.0.1:8000/studentapi/?mypage=2&records=8
    
    it will only show 7 records
    '''
    # max_page_size = 7


class CustomOffsetPagination(LimitOffsetPagination):
    # (if no limit provided by default we get all records, by providing default value it shows only that no of records)
    default_limit = 5

    # instead of using limit word in query parameter, we can use custom word
    # now we can access as
    # http://127.0.0.1:8000/studentapi/?mylimit=4&offset=5
    limit_query_param = 'mylimit'

    # similarly instead of using offset word in query parameter, we can use custom word
    # now we can access as
    # http://127.0.0.1:8000/studentapi/?mylimit=4&myoffset=5

    offset_query_param = 'myoffset'

    # also we can set max limit as
    max_limit = 3
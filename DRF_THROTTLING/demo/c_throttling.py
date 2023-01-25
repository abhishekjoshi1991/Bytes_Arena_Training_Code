from rest_framework.throttling import UserRateThrottle

class CustomRatethrottle(UserRateThrottle):
    scope = 'custom'
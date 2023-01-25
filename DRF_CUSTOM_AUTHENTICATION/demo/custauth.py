from rest_framework import authentication
from django.contrib.auth.models import User
from rest_framework import exceptions

class ExampleAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        import pdb; pdb.set_trace()
        username = request.META.get('HTTP_USERNAME')
        print('----------',username)
        if not username:
            return None

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('No such user')

        return (user, None)

# not working
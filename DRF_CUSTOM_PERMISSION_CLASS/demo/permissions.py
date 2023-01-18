from rest_framework.permissions import BasePermission


class MyPermission(BasePermission):
    def has_permission(self, request, view):
        # we will create logic as, only if request type is of POST then only page is displayed
        if request.method == 'POST':
            return True
        return False
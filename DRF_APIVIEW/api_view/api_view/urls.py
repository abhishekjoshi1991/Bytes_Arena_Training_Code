"""api_view URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from demo import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('student_api/', views.hello_world),

    # paths for CRUD, function based APIView
    path('student_crud/', views.student_crud),
    path('student_crud/<int:pk>', views.student_crud),

    # path for CRUD, class based API View
    path('student_class_api/', views.StudentAPI.as_view()),
    path('student_class_api/<int:pk>', views.StudentAPI.as_view()),

]

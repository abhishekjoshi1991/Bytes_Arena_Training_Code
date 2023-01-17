"""drf_test URL Configuration

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
    path('studentinfo/<int:pk>', views.student_details),
    path('allstudentinfo/', views.all_student_details),
    path('create_student/', views.create_student),

    # urls for CRUD operation using function based view
    path('read_data/', views.read_api),
    path('create_data/', views.create_api),
    path('update_data/', views.update_api),
    path('delete_data/', views.delete_api),

    # urls for CRUD operation using class based view
    path('student_api/', views.StudentAPI.as_view()),

]

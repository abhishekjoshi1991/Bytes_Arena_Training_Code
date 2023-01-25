from django.db import models

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    roll = models.IntegerField()
    pass_by = models.CharField(max_length=20, default=None)

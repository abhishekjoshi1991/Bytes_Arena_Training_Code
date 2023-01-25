from django.db import models

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
    roll = models.IntegerField()

class Post(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField()
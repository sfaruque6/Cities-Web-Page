from django.db import models

class City(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='city_images/')
    description = models.TextField()

    def __str__(self):
        return self.name

class Visit(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    user_id = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Visit to {self.city.name} by user {self.user_id}"
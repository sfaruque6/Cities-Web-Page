
# myapp/serializers.py
from rest_framework import serializers
from .models import City, Visit

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name', 'image', 'description']

class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = ['id', 'city', 'user_id', 'timestamp']

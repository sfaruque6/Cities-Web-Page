'''

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import City
from .serializers import CitySerializer

class CityListView(APIView):
    def get(self, request):
        cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)

class CityDetailView(APIView):
    def get(self, request, city_name):
        try:
            city = City.objects.get(name=city_name)
            serializer = CitySerializer(city)
            return Response(serializer.data)
        except City.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

            '''

# views.py
from rest_framework import viewsets
from .models import City, Visit
from .serializers import CitySerializer, VisitSerializer

class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer

class VisitViewSet(viewsets.ModelViewSet):
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer

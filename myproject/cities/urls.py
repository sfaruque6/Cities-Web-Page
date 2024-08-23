# myapp/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CityViewSet, VisitViewSet


router = DefaultRouter()
router.register(r'cities', CityViewSet)
router.register(r'visits', VisitViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
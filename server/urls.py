from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductCategoryViewSet
from . import consumers
router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', ProductCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('ws/chat/', consumers.ChatConsumer.as_asgi()),
]

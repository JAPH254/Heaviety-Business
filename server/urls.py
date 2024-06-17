from django.urls import path
from . import views

urlpatterns = [
    path('delete_product/<int:product_id>/', views.delete_product, name='delete_product'),
]

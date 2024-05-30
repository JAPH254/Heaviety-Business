from django.shortcuts import render
from .serializers import VendorSerializer, ProductSerializer, ReviewSerializer, CategorySerializer, CouponSerializer, ShippingAddressSerializer, FavoritesSerializer
from .models import Vendor, Product, Review, Category, Coupon, ShippingAddress, Favorites
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
import requests

Domain = 'http://127.0.0.1:8000/'
# Create your views here.
def home(request):
    
    return render(request, 'base.html')


class VendorView(ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView):
    """
    View for Vendor model.
    """
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [AllowAny]

class ProductView(ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView):
    """
    View for Product model.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class ReviewView(ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView):
    """
    View for Review model.
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

class CategoryView(ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView):
    """
    View for Category model.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class CouponView(ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView):
    """
    View for Coupon model.
    """
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    permission_classes = [AllowAny]

class ShippingAddressView(ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView):
    """
    View for ShippingAddress model.
    """
    queryset = ShippingAddress.objects.all()
    serializer_class = ShippingAddressSerializer
    permission_classes = [AllowAny]

class FavoritesView(ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView):
    """
    View for Favorites model.
    """
    queryset = Favorites.objects.all()
    serializer_class = FavoritesSerializer
    permission_classes = [AllowAny]
def getVendors(request):
    vendors = requests.get(Domain + 'server/vendors/')
    data = vendors.json()
    return render(request, 'vendors.html', {'data': data})
def home(request):
    productInfo = requests.get(Domain + 'server/products/')
    data = productInfo.json()
    return render(request, 'index.html', {'data': data})


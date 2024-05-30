from django.urls import path
from .views import VendorView, ProductView, ReviewView, CategoryView, CouponView, ShippingAddressView, FavoritesView
from . import views
urlpatterns = [
    path('vendors/', VendorView.as_view(), name='vendors'),
    path('vendors/<int:id>/', VendorView.as_view(), name='vendor'),
    path('products/', ProductView.as_view(), name='products'),
    path('reviews/', ReviewView.as_view(), name='reviews'),
    path('categories/', CategoryView.as_view(), name='categories'),
    path('coupons/', CouponView.as_view(), name='coupons'),
    path('shipping-addresses/', ShippingAddressView.as_view(), name='shipping-addresses'),
    path('favorites/', FavoritesView.as_view(), name='favorites'),
    path('vend/', views.getVendors, name='vend'),
    path('home/', views.home, name='home'),
]
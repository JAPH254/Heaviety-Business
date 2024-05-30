from django.contrib import admin
from .models import Vendor, Product, Review, Category, Coupon, ShippingAddress, Favorites
# Register your models here.

class VendorAdmin(admin.ModelAdmin):
    list_display = ['shop_name', 'user']
    search_fields = ['shop_name']
    list_filter = ['shop_name']
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'vendor', 'price']
    search_fields = ['name']
    list_filter = ['vendor']
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'user', 'rating']
    search_fields = ['product']
    list_filter = ['product']
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']
    list_filter = ['name']
class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'discount_percentage', 'expiration_date']
    search_fields = ['code']
    list_filter = ['code']
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ['user', 'address_line1', 'city', 'state', 'postal_code']
    search_fields = ['user']
    list_filter = ['user']
class FavoritesAdmin(admin.ModelAdmin):
    list_display = ['user', 'product']
    search_fields = ['user']
    list_filter = ['user']

admin.site.register(Vendor, VendorAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Coupon, CouponAdmin)
admin.site.register(ShippingAddress, ShippingAddressAdmin)
admin.site.register(Favorites, FavoritesAdmin)


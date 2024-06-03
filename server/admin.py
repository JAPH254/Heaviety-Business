from django.contrib import admin
from .models import Product,Order,OrderItem,Category
# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'stock', 'active']
    list_filter = ['active', 'stock']
    search_fields = ['name', 'description']
    list_editable = ['price', 'stock', 'active']

class OrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'placed_at', 'status', 'total_price']
    list_filter = ['status']
    search_fields = ['items']
    list_editable = ['status', 'total_price']

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['ordered_by', 'order', 'product', 'quantity', 'price']
    list_filter = ['product']
    search_fields = ['ordered_by', 'quantity']
    list_editable = ['quantity', 'price']

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    search_fields = ['name', 'description']


admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Category, CategoryAdmin)

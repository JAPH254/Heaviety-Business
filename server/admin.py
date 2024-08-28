from django.contrib import admin
from .models import ProductCategory, Product

@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'stock', 'category', 'status']
    list_filter = ['category', 'status']
    search_fields = ['title', 'description']
    list_editable = ['price', 'stock', 'category', 'status']
    list_per_page = 10
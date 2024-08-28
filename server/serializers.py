from rest_framework import serializers
from .models import Product, ProductCategory

class ProductSerializer(serializers.ModelSerializer):
    user_full_name = serializers.ReadOnlyField(source='user.full_name')

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'stock', 'image', 'created_at', 'updated_at', 'category', 'status', 'user_full_name']

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']

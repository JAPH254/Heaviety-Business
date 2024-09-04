from rest_framework import serializers
from .models import Product, ProductCategory, Message, Notification

class ProductSerializer(serializers.ModelSerializer):
    user_full_name = serializers.ReadOnlyField(source='user.full_name')

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'stock', 'image', 'created_at', 'updated_at', 'category', 'status', 'user_full_name']

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'content', 'timestamp', 'is_read']

class NotificationSerializer(serializers.ModelSerializer):
    message = MessageSerializer()

    class Meta:
        model = Notification
        fields = ['id', 'message', 'is_read', 'timestamp']
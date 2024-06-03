from django.db import models
from users.models import User

class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    # parent_category = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)  # Optional for subcategories

    def __str__(self):
        return self.name

class Product(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True)  # Adjust upload path as needed
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    stock = models.PositiveIntegerField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    placed_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=(
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('canceled', 'Canceled'),
    ))
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    items = models.ManyToManyField(Product, through='OrderItem')  # Using a separate OrderItem model (optional)

    def __str__(self):
        return f"Order {self.pk} - {self.user.first_name}"

class OrderItem(models.Model):
    ordered_by = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity}x {self.product.name} (Order {self.order.pk})"

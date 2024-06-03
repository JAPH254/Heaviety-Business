from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Product
from django.contrib.auth.get_user_model import get_user_model

@receiver(post_save, sender=Product)
def assign_owner(sender, instance, created, **kwargs):
    if created:
        current_user = get_user_model().objects.get(pk=request.user.pk)  # Access user from request context (replace with your logic)
        instance.owner = current_user
        instance.save()

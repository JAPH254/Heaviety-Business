# views.py
from django.shortcuts import render, redirect
from .models import Product
from .forms import ProductForm
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseNotFound


def product_list(request):
    products = Product.objects.all().select_related('owner')
    form = ProductForm()
    return render(request, 'product_list.html', {'products': products, 'form': form})

def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save(commit=False)
            product.owner = request.user
            product.save()
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({'success': True})
        else:
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({'success': False, 'errors': form.errors})
            return redirect('home')
    else:
        form = ProductForm()
    return redirect('product_list')

# the user can only be able to delete or update the product if the user is the owner of the product.

# from django.shortcuts import get_object_or_404, redirect
# from django.contrib import messages

# def delete_product(request, product_id):
#     product = get_object_or_404(Product, id=product_id, owner=request.user)
#     if request.method == "POST":
#         product.delete()
#         messages.success(request, 'Product deleted successfully.')
#         return redirect('profile') 
#     else:
#         return render(request, 'product_list.html', {'product': product})
    
# from django.shortcuts import redirect
# from django.http import HttpResponseNotFound

def delete_product(request, id):
    product = get_object_or_404(Product, id=id)
    if request.user != product.owner:
        return HttpResponseNotFound()
    product.delete()
    return redirect('product_list')









































































# from django.shortcuts import render,redirect
# from .serializers import ProductSerializer,CategorySerializer,OrderSerializer,OrderItemSerializer
# from .models import Product,Category,Order,OrderItem
# from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView 
# from rest_framework.permissions import IsAuthenticated, AllowAny
# import requests
# from django.shortcuts import  get_object_or_404
# from .forms import ProductForm
# from django.http import JsonResponse
# from django.contrib.auth.decorators import login_required


# Domain = 'http://127.0.0.1:8000/'
# # Create your views here.
# def home(request):
    
#     return render(request, 'base.html')


# class ProductView(ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView):
#     """
#     View for Product model.
#     """
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     permission_classes = [AllowAny]



# class CategoryView(ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView):
#     """
#     View for Category model.
#     """
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     permission_classes = [AllowAny]

# class OrderView(ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView):
#     """
#     View for Order model.
#     """
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer
#     permission_classes = [AllowAny]

# class OrderItemView(ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView):
#     """
#     View for OrderItem model.
#     """
#     queryset = OrderItem.objects.all()
#     serializer_class = OrderItemSerializer
#     permission_classes = [AllowAny]
# def home(request):
#     products = Product.objects.all().select_related('owner')
#     context = {'products': products}
#     return render(request, 'index.html', context)

# @login_required
# def addProduct(request):
#     if request.method == 'POST':
#         form = ProductForm(request.POST, request.FILES)
#         if form.is_valid():
#             product = form.save(commit=False)
#             product.owner = request.user
#             product.save()
#             if request.headers.get('x-requested-with') == 'XMLHttpRequest':
#                 return JsonResponse({'success': True})
#         else:
#             if request.headers.get('x-requested-with') == 'XMLHttpRequest':
#                 return JsonResponse({'success': False, 'errors': form.errors})
#             return redirect('home')
#     else:
#         form = ProductForm()
#     return render(request, 'index.html', {'form': form})
from django.shortcuts import render,redirect
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer
from .models import User
from .forms import UserRegisterForm
from django.contrib.auth import authenticate, login, logout

# Create your views here.

class UserView(ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView):
    """
    View for User model.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('signin')

    else:
        form = UserRegisterForm()
    return render(request, 'register.html')

def signin(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return redirect('signin')
    return render(request, 'Login.html')

def signout(request):
    logout(request)
    return redirect('signin')

def profile(request):
    return render(request, 'profile.html')
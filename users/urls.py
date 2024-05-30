from django.urls import path
from .views import UserView
from . import views
urlpatterns = [
    path('users/', UserView.as_view(), name='users'),
    path('users/<int:pk>/', UserView.as_view(), name='user'),
    path('register/', views.register, name='register'),
    path('signin/', views.signin, name='signin'),
    path('logout/', views.signout, name='logout'),
    path('profile/', views.profile, name='profile')
]

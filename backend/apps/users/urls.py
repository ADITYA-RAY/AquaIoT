from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import LoginRefresh, RegisterMaintainer, VerifyOTP, LoginView, TestView 

urlpatterns = [
    path('register/', RegisterMaintainer.as_view(), name='register'),
    path('verifyotp/', VerifyOTP.as_view(), name = 'verify'),
    path('login/', LoginView.as_view(),
         name='obtain_token_pair'),
    path('login/refresh/', jwt_views.TokenRefreshView.as_view(),
         name='refresh_token'),
    path('test/', TestView.as_view(),name='test' ),
]
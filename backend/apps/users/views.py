from tokenize import Token
from .models import Maintainer
from .serializers import MaintainerRegistrationSerializer
from rest_framework import generics
from django.core.mail import send_mail
from django.conf import settings

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken

import secrets
import string
import hashlib
from datetime import datetime, timedelta
import pytz



class RegisterMaintainer(generics.CreateAPIView):
    
    def post(self, request):
        if not Maintainer.objects.filter(email=request.data['email']).exists():
            serializer = MaintainerRegistrationSerializer(data=request.data)
            if serializer.is_valid(raise_exception = True):
                email_add = request.data['email']
                otp = ''.join(secrets.choice(
                    string.ascii_uppercase + string.digits) for i in range(6))
                hs = hashlib.sha256(otp.encode('utf-8'))
                serializer.create(request.data)
                otp_hex = hs.hexdigest()
                expiration_time = datetime.now() + timedelta(minutes=5)
                serializer.method(expiration_time=expiration_time, otp_hex=otp_hex)
                send_mail('OTP for your information update', 'Your OTP for information update is ' + otp +
                        '\nThis OTP is valid for the next 5 minutes', settings.EMAIL_HOST_USER, [email_add], fail_silently=False)
                return Response({'Status' : 'Success'}, status=status.HTTP_201_CREATED)
            return Response({'Status' : 'Invalid Query'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if Maintainer.objects.get(email=request.data['email']).is_verified:
                return Response({'Status' : 'User already registered'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
            email_add = request.data['email']
            maintainer = Maintainer.objects.get(email=email_add)
            if ('first_name' in request.data and 'last_name' in request.data and 'password' in request.data):
                maintainer.first_name = request.data['first_name']
                maintainer.last_name = request.data['last_name']
                maintainer.expiration_time = datetime.now() + timedelta(minutes=5) 
                print(maintainer.expiration_time)
                maintainer.set_password(request.data['password'])
                email_add = request.data['email']
                otp = ''.join(secrets.choice(
                    string.ascii_uppercase + string.digits) for i in range(6))
                hs = hashlib.sha256(otp.encode('utf-8'))
                maintainer.otp_hex = hs.hexdigest()
                maintainer.save()
                send_mail('OTP for your information update', 'Your OTP for information update is ' + otp +
                        '\nThis OTP is valid for the next 5 minutes', settings.EMAIL_HOST_USER, [email_add], fail_silently=False)
                return Response({'OTP Hex' : hs.hexdigest()}, status=status.HTTP_201_CREATED)
            else:
                return Response({'Status' : 'Invalid Query'}, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTP(generics.CreateAPIView):

    def post(self, request):
        if 'email' in request.data and 'otp' in request.data:
            maintainer = Maintainer.objects.get(email=request.data['email'])
            otp = request.data['otp']
            hs = hashlib.sha256(otp.encode('utf-8'))
            hex = hs.hexdigest()
            if hex == maintainer.otp_hex: 
                utc = pytz.UTC
                comp = utc.localize(datetime.now())
                if comp < maintainer.expiration_time:
                    maintainer.otp_hex = ""
                    maintainer.is_verified = True
                    maintainer.save()
                    return Response({'Status' : 'Success'}, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response({'Status' : 'OTP has expired'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({'Status' : 'OTP did not match'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'Status' : 'Invalid Query'}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(TokenObtainPairView):
    
    def post(self, request):
        if not request.data['email'] or not request.data['password']:
            return Response('Invalid Query', status=status.HTTP_400_BAD_REQUEST)
        try: 
            m = Maintainer.objects.get(email=request.data['email'])

        except:
            return Response({'Status' : 'User not registered'}, status=status.HTTP_403_FORBIDDEN)
        if m.is_verified:
            if m.check_password(request.data['password']):
                refresh = RefreshToken.for_user(m)            
                tokens = {
                    'refresh' : str(refresh),
                    'access' : str(refresh.access_token)
                }
                return Response(tokens, status=status.HTTP_201_CREATED)
            else:
                return Response({'Status' : 'Password invalid'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response('The user is not verified', status=status.HTTP_401_UNAUTHORIZED)

class LoginRefresh(TokenObtainPairView):
    def post(self, request):
        if not request.data['refresh']:
            return Response('Missing Refresh Token', status=status.HTTP_401_UNAUTHORIZED)
        access_token = {
            'access' : str(request.data['refresh'].access_token)
        }
        return Response(access_token, status=status.HTTP_201_CREATED)

class TestView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        return Response('done', status=status.HTTP_200_OK)

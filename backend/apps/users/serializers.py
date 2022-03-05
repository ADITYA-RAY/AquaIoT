from rest_framework import serializers, exceptions
from django.contrib import auth
from .models import Maintainer
import datetime

class MaintainerRegistrationSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Maintainer
        fields = ('email', 'first_name', 'last_name' ,'password', 'is_verified')

    def create(self, validated_data):
        maintainer = Maintainer.objects.create(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            expiration_time = validated_data['expiration_time'],
            otp_hex = validated_data['otp_hex']
        )
        print(type(validated_data['email']))
        maintainer.set_password(validated_data['password'])
        maintainer.save()

        return maintainer

    def update(self, instance, validated_data):
        instance.is_verified = validated_data
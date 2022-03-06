from rest_framework import serializers
from .models import Maintainer
import datetime

class MaintainerRegistrationSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True, required=True)
    expiration_time = datetime.datetime.now()
    otp_hex = ''
    class Meta:
        model = Maintainer
        fields = ('email', 'first_name', 'last_name' ,'password', 'is_verified')

    def method(self, expiration_time, otp_hex):
        self.expiration_time = expiration_time
        self.otp_hex = otp_hex

    def create(self, validated_data):
        maintainer = Maintainer.objects.create(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            expiration_time = self.expiration_time,
            otp_hex = self.otp_hex,
        )
        print(type(validated_data['email']))
        maintainer.set_password(validated_data['password'])
        maintainer.save()

        return maintainer

    def update(self, instance, validated_data):
        instance.is_verified = validated_data
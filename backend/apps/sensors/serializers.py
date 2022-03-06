from rest_framework import serializers
from .models import Sensors, SensorData

import datetime

class SensorRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sensors
        fields = ('location', 'city')
   
    
class SensorDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = SensorData
        fields = ('ph', 'temperature', 'tds')
from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from ..users.models import Maintainer

from .serializers import SensorDataSerializer, SensorRegistrationSerializer
from .models import Sensors, SensorData

class RegisterSensor(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        serializer = SensorRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            m = Maintainer.objects.get(email=request.data['email'])
            obj = serializer.save(maintainer=m)

            return Response({'Status' : 'Success', 'UUID' : obj.sensorID}, status=status.HTTP_201_CREATED)
        else:
            return Response({'Status' : 'Missing Parameters'}, status=status.HTTP_400_BAD_REQUEST)

class GetSensorData(APIView):
    def get(self, request):
        if request.data['city']:
            sensorlist = Sensors.objects.filter(city=request.data['city'])
            if not sensorlist.exists():
                return Response({'Status' : 'No sensors present in this city'}, status=status.HTTP_200_OK)
            res_dict = {}
            for sensor in sensorlist.iterator():
                print(type(sensor))
                sensordata = SensorData.objects.filter(sensor=sensor)
                sensordatadict = sensordata.values()
                sensorloc = {
                    'location' : sensor.location,
                    'city' : sensor.city,
                    'latitude' : sensor.latitude,
                    'longitude' : sensor.longitude,
                }
                print(sensordatadict)
                sensorloc.update({'sensordata' : list(sensordatadict)})
                res_dict[str(sensor.sensorID)] = sensorloc
            return Response(res_dict, status=status.HTTP_200_OK)
        else:
            return Response({'Status' : 'City Filter absent'})

class GetSensorMaintainer(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        email = request.data['email']
        m = Maintainer.objects.get(email=email)
        sensorlist = Sensors.objects.filter(maintainer=m)
        if not sensorlist.exists():
            return Response({'Status' : 'No sensors registered by this maintainer'}, status=status.HTTP_200_OK)
        res_dict = {}

        for sensor in sensorlist.iterator():
            print(type(sensor))
            sensordata = SensorData.objects.filter(sensor=sensor)
            sensordatadict = sensordata.values()
            sensorloc = {
                'location' : sensor.location,
                'city' : sensor.city,
                'latitude' : sensor.latitude,
                'longitude' : sensor.longitude,
            }
            print(sensordatadict)
            sensorloc.update({'sensordata' : list(sensordatadict)})
            res_dict[str(sensor.sensorID)] = sensorloc
        return Response(res_dict, status=status.HTTP_200_OK)

class InsertSensorData(APIView):
    def post(self, request):
        if request.data['sensorID']:
            if Sensors.objects.filter(sensorID=request.data['sensorID']).exists():
                s = Sensors.objects.get(sensorID=request.data['sensorID'])
                if request.data['latitude'] and request.data['longitude'] and request.data['ph'] and request.data['temperature'] and request.data['tds']:
                    SensorData(sensor=s, temperature=request.data['temperature'], ph=request.data['ph'], tds=request.data['tds']).save()
                    s.latitude = request.data['latitude']
                    s.longitude = request.data['longitude']
                    s.save()
                    return Response({'Status' : 'Success'}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'Status' : 'Fields missing'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'Status' : 'Sensor of this uuid does not exist'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        else:
            return Response({'Status' : 'Missing sensor ID'}, status=status.HTTP_400_BAD_REQUEST)
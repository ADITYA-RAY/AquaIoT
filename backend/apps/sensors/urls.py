from django.urls import path
from .views import RegisterSensor, GetSensorData, GetSensorMaintainer, InsertSensorData

urlpatterns = [
    path('registersensor/', RegisterSensor.as_view(), name='sensorregister'),
    path('getsensordata/', GetSensorData.as_view(), name='sensordata'),
    path('getsensormaintainer/', GetSensorMaintainer.as_view(), name='sensormaintainer'),
    path('insertsensordata/', InsertSensorData.as_view(), name='insertsensordata')
]
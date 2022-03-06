from django.db import models
from ..users.models import Maintainer
import uuid
from datetime import datetime, timedelta


def get_ist_time():
    return datetime.now() + timedelta(hours=5, minutes=30)


class Sensors(models.Model):
    maintainer = models.ForeignKey(Maintainer, on_delete=models.CASCADE, null=False)
    sensorID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    latitude = models.DecimalField(max_digits=8, decimal_places=6, default=0.0)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    location = models.TextField()
    city = models.TextField()

    def __str__(self):
        return str(self.sensorID)

class SensorData(models.Model):
    sensor = models.ForeignKey(Sensors, on_delete=models.CASCADE, null=False)
    ph = models.DecimalField(max_digits=4, decimal_places=2)
    temperature = models.DecimalField(max_digits=6, decimal_places=2)
    tds = models.DecimalField(max_digits=5, decimal_places=2)
    def __str__(self):
        return str(self.sensor.sensorID)
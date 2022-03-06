#include <SPI.h>
#include <Ethernet.h>
EthernetClient client;
const char* ssid = "SSID"; // Name of the Host
const char* password = "PASSWORD";  // Password of the corresponding Host
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
const char* host = "https://domain.herokuapp.com/";
const int httpPort = 80;
const char* fingerprint = "968407df0b1cf65814dfd7333557519b154d8ce7";
//queryString=String()+String()+String()+String();
#define TdsSensorPin A3  //TDS sensor pin connected to pin A3 of the arduino
#define VREF 5.0      // analog reference voltage(Volt) of the ADC
#define SCOUNT  30      // sum of sample point
int analogBuffer[SCOUNT];    // store the analog value in the array, read from ADC
int analogBufferTemp[SCOUNT];
int analogBufferIndex = 0,copyIndex = 0;
float averageVoltage = 0,tdsValue = 0,temperature = 25;
int tPin=5;  //negative side of the thermistor connected to pin A5
#define SensorPin 4   // the pH meter Analog output is connected to pin A4
unsigned long int avgValue;   //Storing the average value of the sensor feedback
float b;
int buf[10],temp;
void setup() 
{
  pinMode(13,OUTPUT);
  pinMode(8,OUTPUT);
  Serial.begin(115200);
  pinMode(TdsSensorPin,INPUT);
  while (!Serial) 
  {
    ;
  }
  Serial.print("connecting to ");
  Serial.println(ssid);
  if (Ethernet.begin(mac) == 0) 
  {
    Serial.println("Failed to obtain an IP address using DHCP");
    while(true);
  }
  Serial.println("WiFi connected");
  Serial.print("  DHCP assigned IP ");
  Serial.println(Ethernet.localIP());
  Serial.print("connecting to ");
  Serial.println(host);
  if (client.connect(host, httpPort)) 
  { 
    Serial.println("connected to server");
    String url = "/api/sensors/insertsensordata/"; 
    Serial.print("requesting URL: ");
    Serial.println(url);
   client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n"
               /*"User-Agent: BuildFailureDetectorESP8266\r\n"*/ +
               "Connection: close\r\n\r\n");
  }
  Serial.println("request sent");
  while (client.connected()) 
  {
    String line = client.readStringUntil('\n');
    if (line == "\r")
    {
      Serial.println("headers received");
      break;
    }
  }
  String line = client.readStringUntil('\n');
  if (line.startsWith(" ")) 
  {
    Serial.println("esp8266/Arduino CI successfull!");
  } 
  else 
  {
    Serial.println("esp8266/Arduino CI has failed");
  }
  Serial.println("reply was:");
  Serial.println("==========");
  Serial.println(line);
  Serial.println("==========");
  Serial.println("closing connection");  
}

void loop() 
{
  digitalWrite(8,HIGH);
  float a = analogRead(tPin);
      //the calculating formula of temperature
  float resistor = (1023.0*10000)/a-10000;
  float tempC = (3435.0/(log(resistor/10000)+(3435.0/(273.15+25)))) - 273.15;
  Serial.print("Temperature: ");
  Serial.print(tempC);
  Serial.println(" C");
  delay(1000);

  //pH code begins
  for(int i=0;i<10;i++)  
      //Get 10 sample value from the sensor for smooth value
  { 
    buf[i]=analogRead(SensorPin);
    delay(10);
  }
  for(int i=0;i<9;i++)   
        //sort the analog from small to large
  {
    for(int j=i+1;j<10;j++)
    {
      if(buf[i]>buf[j])
      {
        temp=buf[i];
        buf[i]=buf[j];
        buf[j]=temp;
      }
    }
  }
  avgValue=0;
  for(int i=2;i<8;i++)
        //take the average value of 6 center sample
  avgValue+=buf[i];
  float phValue=(float)avgValue*5.0/1024/6; 
  phValue=3.5*phValue;
  Serial.print("pH:");
  Serial.print(phValue,2);
  digitalWrite(13, HIGH);       
  delay(1000);
  digitalWrite(13, LOW); 
  delay(1000);

  //tds code begins
  static unsigned long analogSampleTimepoint = millis();
   if(millis()-analogSampleTimepoint > 1000)    
   //every 1000 milliseconds,read the analog value from the ADC
   {
     analogSampleTimepoint = millis();
     analogBuffer[analogBufferIndex] = analogRead(TdsSensorPin);    //read the analog value and store into the buffer
     analogBufferIndex++;
     if(analogBufferIndex == SCOUNT) 
         analogBufferIndex = 0;
   }   
   static unsigned long printTimepoint = millis();
   if(millis()-printTimepoint > 1000)
   {
      printTimepoint = millis();
      for(copyIndex=0;copyIndex<SCOUNT;copyIndex++)
        analogBufferTemp[copyIndex]= analogBuffer[copyIndex];
      averageVoltage = getMedianNum(analogBufferTemp,SCOUNT) * (float)VREF / 1024.0; 
            // read the analog value more stable by the median filtering algorithm, and convert to voltage value
      float compensationCoefficient=1.0+0.02*(temperature-25.0);    
          //temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0));
      float compensationVolatge=averageVoltage/compensationCoefficient;  
            //temperature compensation
      tdsValue=(133.42*compensationVolatge*compensationVolatge*compensationVolatge - 255.86*compensationVolatge*compensationVolatge + 857.39*compensationVolatge)*0.5; //convert voltage value to tds value
      //Serial.print("voltage:");
      //Serial.print(averageVoltage,2);
      //Serial.print("V   ");
      Serial.print("TDS Value:");
      Serial.print(tdsValue,0);
      Serial.println("ppm");
   }
}
int getMedianNum(int bArray[], int iFilterLen) 
{
      int bTab[iFilterLen];
      for (byte i = 0; i<iFilterLen; i++)
      bTab[i] = bArray[i];
      int i, j, bTemp;
      for (j = 0; j < iFilterLen - 1; j++) 
      {
      for (i = 0; i < iFilterLen - j - 1; i++) 
          {
        if (bTab[i] > bTab[i + 1]) 
            {
        bTemp = bTab[i];
            bTab[i] = bTab[i + 1];
        bTab[i + 1] = bTemp;
         }
      }
      }
      if ((iFilterLen & 1) > 0)
    bTemp = bTab[(iFilterLen - 1) / 2];
      else
    bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
      return bTemp;
  delay(30000);
}

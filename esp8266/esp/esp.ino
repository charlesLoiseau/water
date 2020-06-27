#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

int sensor = A0;
int lastMinVal[60];
int lastIndex = 0;
int average = 0;

const String ssid = "";
const String password = "";
const String sensorName = "";
const char* host = "";
const int port = ;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {  // Wait for the WiFI connection completion
    delay(500);
    Serial.println("Waiting for connection");
  }
  for (int i = 0; i < 60; i++) {
    lastMinVal[i] = 0;
  }
  Serial.println("Connected");
}

void loop() {
  // put your main code here, to run repeatedly:
  int value = analogRead(sensor);
  avarageOverMinute(value);
}

void avarageOverMinute(int current) {
  lastMinVal[lastIndex] = current;
  lastIndex++;
  int total = 0;
  if (lastIndex >= 60) {
    for (int i = 0; i < 60; i++) {
      total = total + lastMinVal[i];
      lastMinVal[i] = 0;
    }
    lastIndex = 0;
  }
  delay(1000);
}

void postData(int data) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin("http://" + (String)host + ":" + (String)port + "/measurement/" + (String)sensorName);
    http.addHeader("Content-Type", "application/json");
    http.POST("{\"capacity\": \"" + (String)data + "\"}");
    http.end();
  } else {
    Serial.println("Error in WiFi connection");
  }
}

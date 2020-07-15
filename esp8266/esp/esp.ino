#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

int sensor = A0;

#define durationSleep 60
const String ssid = "";
const String password = "";
const String sensorName = "";
const char* host = "";
const int port = 3000;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {  // Wait for the WiFI connection completion
    delay(500);
    Serial.println("Waiting for connection");
  }
  Serial.println("Connected");
}

void loop() {
  postData(analogRead(sensor));
  ESP.deepSleep(durationSleep * 1000000);
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

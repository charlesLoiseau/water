#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

int sensor = A0;

const String ssid = "";
const String password = "";
const char* host = "";
const int port = 3000;


void postData(WiFiClient client, int data) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(client, "http://" + (String)host + ":" + (String)port + "/measurement/" + (String)ESP.getChipId());
    http.addHeader("Content-Type", "application/json");
    http.POST("{\"capacity\": \"" + (String)data + "\"}");
    http.end();
    
    Serial.println("sended {\"capacity\": \"" + (String)data + "\"} To " + "http://" + (String)host + ":" + (String)port + "/measurement/" + (String)ESP.getChipId());
  } else {
    Serial.println("Error in WiFi connection");
  }
}


void setup() {
  Serial.begin(115200);
  delay(1000);
    WiFiClient client;
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {  // Wait for the WiFI connection completion
    delay(500);
    Serial.println("Waiting for connection");
  }
  Serial.println("Connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.printf("Asking for sensor creation for: "+ ESP.getChipId());
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, "http://" + (String)host + ":" + (String)port + "/sensor");
    http.addHeader("Content-Type", "application/json");
    Serial.println(http.POST("{\"sensorName\": \"" + (String)ESP.getChipId() + "\"}"));
    http.end();
  }
  postData(client, analogRead(sensor));
  WiFi.disconnect();
  ESP.deepSleep(30e6); 
}

void loop() {

  
}
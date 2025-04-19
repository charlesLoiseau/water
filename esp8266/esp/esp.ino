#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

int sensor = A0;

const String ssid = "";       // WiFi SSID
const String password = "";   // WiFi Password
const char* host = "";        // Server Host
const int port = 3000;        // Server Port

/**
 * Send data to the server.
 * @param data - The sensor data to send.
 */
void postData(int data) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "http://" + (String)host + ":" + (String)port + "/measurement/" + (String)ESP.getChipId();
    String payload = "{\"capacity\": \"" + (String)data + "\"}";

    http.begin(url);
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(payload);
    http.end();

    Serial.printf("Sent: %s to %s, Response Code: %d\n", payload.c_str(), url.c_str(), httpCode);
  } else {
    Serial.println("Error: WiFi not connected");
  }
}

/**
 * Register the sensor with the server.
 */
void registerSensor() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "http://" + (String)host + ":" + (String)port + "/sensor";
    String payload = "{\"sensorName\": \"" + (String)ESP.getChipId() + "\"}";

    http.begin(url);
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(payload);
    http.end();

    Serial.printf("Sensor Registration: %s, Response Code: %d\n", payload.c_str(), httpCode);
  } else {
    Serial.println("Error: WiFi not connected");
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("WiFi Connected");
  Serial.printf("IP Address: %s\n", WiFi.localIP().toString().c_str());

  // Register the sensor and send data
  registerSensor();
  postData(analogRead(sensor));

  // Disconnect WiFi and enter deep sleep
  WiFi.disconnect();
  ESP.deepSleep(30e6); // Sleep for 30 seconds
}

void loop() {
  // Empty loop since the ESP8266 will be in deep sleep
}
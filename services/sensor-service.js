const Sensor = require("../models/sensor");

/**
 * Get all sensors.
 * @returns {Promise<Array>} - List of sensors.
 */
exports.getSensors = async () => {
  try {
    return await Sensor.find();
  } catch (error) {
    console.error("Error fetching sensors:", error);
    throw error;
  }
};

/**
 * Get the ID of a sensor by its name.
 * @param {string} sensorName - The name of the sensor.
 * @returns {Promise<string|null>} - The sensor ID or null if not found.
 */
exports.getSensorId = async (sensorName) => {
  if (!sensorName) return null;

  try {
    const sensor = await Sensor.findOne({ sensorName });
    return sensor ? sensor._id : null;
  } catch (error) {
    console.error("Error fetching sensor ID:", error);
    throw error;
  }
};

/**
 * Add a new sensor if it doesn't already exist.
 * @param {string} sensorName - The name of the sensor.
 * @returns {Promise<number>} - Returns -2 if the sensor exists, or the result of the update operation.
 */
exports.setSensor = async (sensorName) => {
  if (!sensorName) return -1;

  try {
    const existingSensor = await Sensor.findOne({ sensorName });
    if (existingSensor) return -2;

    const currentDate = Date.now();
    return await updateSensor(Sensor, currentDate, sensorName);
  } catch (error) {
    console.error("Error setting sensor:", error);
    throw error;
  }
};

/**
 * Update or insert a sensor.
 * @param {Object} collection - The Mongoose model.
 * @param {number} timestamp - The current timestamp.
 * @param {string} sensorName - The name of the sensor.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const updateSensor = async (collection, timestamp, sensorName) => {
  try {
    return await collection.updateOne(
      { timestamp },
      { sensorName },
      { upsert: true }
    );
  } catch (error) {
    console.error("Error updating sensor:", error);
    throw error;
  }
};



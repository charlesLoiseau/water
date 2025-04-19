const Measurement = require("../models/measurement");

/**
 * Get the last measurement for a specific sensor.
 * @param {string} sensorName - The name of the sensor.
 * @returns {Promise<Object|null>} - The last measurement or null if not found.
 */
exports.getLastMeasurement = async (sensorName) => {
  if (!sensorName) return null;

  try {
    return await Measurement.findOne({ sensorName }).sort({ timestamp: -1 });
  } catch (error) {
    console.error("Error fetching last measurement:", error);
    return null;
  }
};

/**
 * Get all measurements for a specific sensor.
 * @param {string} sensorName - The name of the sensor.
 * @returns {Promise<Array|null>} - List of measurements or null if not found.
 */
exports.getMeasurements = async (sensorName) => {
  if (!sensorName) return null;

  try {
    return await Measurement.find({ sensorName });
  } catch (error) {
    console.error("Error fetching measurements:", error);
    return null;
  }
};

/**
 * Get measurements within a specific time range for a sensor.
 * @param {string} sensorName - The name of the sensor.
 * @param {number} durationMs - The duration in milliseconds (e.g., last hour, day, or week).
 * @returns {Promise<Array|null>} - List of measurements or null if not found.
 */
const getMeasurementsByDuration = async (sensorName, durationMs) => {
  if (!sensorName) return null;

  const now = new Date();
  const startTime = new Date(now.getTime() - durationMs);

  try {
    return await Measurement.find({
      timestamp: { $gte: startTime, $lte: now },
      sensorName,
    }).sort({ timestamp: -1 });
  } catch (error) {
    console.error("Error fetching measurements by duration:", error);
    return null;
  }
};

exports.getLastHourMeasurements = async (sensorName) =>
  getMeasurementsByDuration(sensorName, 1000 * 60 * 60);

exports.getLastDayMeasurements = async (sensorName) =>
  getMeasurementsByDuration(sensorName, 1000 * 60 * 60 * 24);

exports.getLastWeekMeasurements = async (sensorName) =>
  getMeasurementsByDuration(sensorName, 1000 * 60 * 60 * 24 * 7);

/**
 * Get measurements based on a custom query.
 * @param {Object} query - The query object for timestamps.
 * @param {string} sensorName - The name of the sensor.
 * @returns {Promise<Array|null>} - List of measurements or null if not found.
 */
exports.getQueryMeasurements = async (query, sensorName) => {
  if (!sensorName || !query) return null;

  try {
    return await Measurement.find({
      timestamp: query,
      sensorName,
    });
  } catch (error) {
    console.error("Error fetching query measurements:", error);
    return null;
  }
};

/**
 * Add or update a measurement for a specific sensor.
 * @param {number} capacity - The measurement data.
 * @param {string} sensorName - The name of the sensor.
 * @returns {Promise<Object>} - The result of the update operation.
 */
exports.setMeasurement = async (capacity, sensorName) => {
  if (!capacity || !sensorName) return null;

  const minute = 1000 * 60;
  const currentMinute = new Date(
    Math.floor(new Date().getTime() / minute) * minute
  );

  try {
    return await updateMeasurement(Measurement, currentMinute, capacity, sensorName);
  } catch (error) {
    console.error("Error setting measurement:", error);
    return null;
  }
};

/**
 * Helper function to update or insert a measurement.
 * @param {Object} collection - The Mongoose model.
 * @param {Date} timestamp - The timestamp of the measurement.
 * @param {number} data - The measurement data.
 * @param {string} sensorName - The name of the sensor.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const updateMeasurement = async (collection, timestamp, data, sensorName) => {
  if (!timestamp || !data || !sensorName) return null;

  try {
    return await collection.updateOne(
      { timestamp },
      { data, sensorName },
      { upsert: true }
    );
  } catch (error) {
    console.error("Error updating measurement:", error);
    return null;
  }
};

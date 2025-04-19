const measurementService = require("../services/measurement-service");
const sensorService = require("../services/sensor-service");

/**
 * Helper function to validate sensorName in the request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {boolean} - Returns true if validation passes, otherwise sends a response and returns false.
 */
const validateSensorName = (req, res) => {
  if (!req.params.sensorName) {
    res.status(400).send({ error: "sensorName required" });
    return false;
  }
  return true;
};

/**
 * Helper function to aggregate measurements.
 * @param {number} intervals - Number of intervals (e.g., 24 for hours, 7 for days).
 * @param {number} intervalMs - Interval duration in milliseconds.
 * @param {string} sensorName - The name of the sensor.
 * @returns {Array} - Aggregated measurements.
 */
const aggregateMeasurements = async (intervals, intervalMs, sensorName) => {
  const results = [];
  const now = new Date();
  now.setHours(24, 0, 0, 0);

  for (let i = 0; i < intervals; i++) {
    const start = new Date(now.getTime() - intervalMs * (i + 1));
    const end = new Date(now.getTime() - intervalMs * i);

    const query = { $gte: start, $lte: end };
    const measurements = await measurementService.getQueryMeasurements(query, sensorName);

    const total = measurements.reduce((sum, m) => sum + m.data, 0);
    const average = measurements.length > 0 ? total / measurements.length : 0;

    results.push({
      timestamp: start,
      sensorName,
      data: average,
    });
  }

  return results.reverse(); // Reverse to maintain chronological order
};

/**
 * Get the last hour's measurements for a specific sensor.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.getLastHourMesurement = async (req, res, next) => {
  if (req.params.sensorName === undefined || req.params.sensorName === null) {
    res.status(400).send({ error: "sensorName required" });
    return;
  }
  sensorId = sensorService.getSensorId(req.params.sensorName);
  if (sensorId === -1) {
    res.status(400).send({ error: "sensorName not found" });
    return;
  }
  try {
    const lastHour = await measurementService.getLastHourMeasurements(req.params.sensorName);
    res.json(lastHour);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

/**
 * Get the last day's measurements for a specific sensor, aggregated by hour.
 */
exports.getLastDayMesurement = async (req, res) => {
  if (!validateSensorName(req, res)) return;

  try {
    const day = await aggregateMeasurements(24, 1000 * 60 * 60, req.params.sensorName);
    res.json(day);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

/**
 * Get the last week's measurements for a specific sensor, aggregated by day.
 */
exports.getLastWeekMesurement = async (req, res) => {
  if (!validateSensorName(req, res)) return;

  try {
    const week = await aggregateMeasurements(7, 1000 * 60 * 60 * 24, req.params.sensorName);
    res.json(week);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

/**
 * Set a new measurement for a specific sensor.
 */
exports.setMeasurement = async (req, res) => {
  if (!validateSensorName(req, res)) return;

  try {
    await measurementService.setMeasurement(req.body.capacity, req.params.sensorName);
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

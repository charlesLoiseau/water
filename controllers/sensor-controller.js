const sensorService = require("../services/sensor-service");

/**
 * Get all sensors.
 */
exports.getSensors = async (req, res) => {
  try {
    const sensors = await sensorService.getSensors();
    res.json(sensors);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

/**
 * Add a new sensor.
 */
exports.setSensor = async (req, res) => {
  const { sensorName } = req.body;

  if (!sensorName) {
    return res.status(400).send({ error: "sensorName required" });
  }

  try {
    const result = await sensorService.setSensor(sensorName);

    if (result === -1) {
      return res.status(400).send({ error: "sensorName required" });
    }

    if (result === -2) {
      return res.status(400).send({ error: "sensorName already exists" });
    }

    res.status(200).json("Success");
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};
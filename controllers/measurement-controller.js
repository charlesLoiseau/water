const measurementService = require("../services/measurement-service");

exports.getLastHourMesurement = async (req, res, next) => {

  res.json(await measurementService.getLastHourMeasurements(req.params.sensorName))
}

exports.getLastDayMesurement = async (req, res, next) => {

  res.json(await measurementService.getLastDayMeasurements(req.params.sensorName))
}

exports.getLastWeekMesurement = async (req, res, next) => {

  res.json(await measurementService.getLastWeekMeasurements(req.params.sensorName))
}

exports.setMeasurement = async (req, res, next) => {
  await measurementService.setMeasurement(
    req.body.capacity,
    req.params.sensorName
  );
  res.status(200);
  res.json("Success");
};

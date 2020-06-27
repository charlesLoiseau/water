const express = require("express");
const router = express.Router();

const MeasurementController = require("../controllers/measurement-controller");
router.post("/measurement/:sensorName", MeasurementController.setMeasurement);
router.get("/measurement/:sensorName/lastHour", MeasurementController.getLastHourMesurement);
router.get("/measurement/:sensorName/lastDay", MeasurementController.getLastDayMesurement);
router.get("/measurement/:sensorName/lastWeek", MeasurementController.getLastWeekMesurement);

module.exports = router;

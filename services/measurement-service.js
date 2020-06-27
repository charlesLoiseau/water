const Measurement = require("../models/measurement");

exports.getLastMeasurement = async (sensorName) => {
  return await Measurement.findOne({ sensorName }).sort({ timestamp: -1 });
};

exports.getMeasurements = async (sensorName) => {
  return await Measurement.find({ sensorName });
};

exports.getLastHourMeasurements = async (sensorName) => {

  var today = new Date();
  var q = Measurement.find({ 
    timestamp: {
      $lte: new Date(),
      $gte: new Date(new Date(today.getTime() - (1000*60*60)))
    },
    sensorName: sensorName
   })
  return await q.exec();
};

exports.getLastDayMeasurements = async (sensorName) => {

  var today = new Date();
  var q = Measurement.find({ 
    timestamp: {
      $lte: new Date(),
      $gte: new Date(new Date(today.getTime() - (1000*60*60*24)))
    },
    sensorName: sensorName
   })
  return await q.exec();
};

exports.getLastWeekMeasurements = async (sensorName) => {

  var today = new Date();
  var q = Measurement.find({ 
    timestamp: {
      $lte: new Date(),
      $gte: new Date(new Date(today.getTime() - (1000*60*60*24*7)))
    },
    sensorName: sensorName
   })
  return await q.exec();
};

exports.setMeasurement = async (capacity, sensorName) => {
  const minute = 1000 * 60;

  const currentMinute = new Date(
    Math.floor(new Date().getTime() / minute) * minute
  );

  let result = [];
  result.push(
    await updateMeasurement(Measurement, currentMinute, capacity, sensorName)
  );

  return result;
};

const updateMeasurement = async (collection, timestamp, data, sensorName) => {
  return await collection.updateOne(
    {
      timestamp,
    },
    {
      data,
      sensorName,
    },
    {
      upsert: true,
    }
  );
};

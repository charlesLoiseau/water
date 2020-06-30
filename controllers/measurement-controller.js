const measurementService = require("../services/measurement-service");

exports.getLastHourMesurement = async (req, res, next) => {

  res.json(await measurementService.getLastHourMeasurements(req.params.sensorName))
}

exports.getLastDayMesurement = async (req, res, next) => {
  let day = [];
  let i = 0;
  let total = 0;
  var today = new Date();
  today.setHours(24, 0, 0, 0)
  for (let index = 0; index < 24; index++) {
    let q = {
      $lte: new Date(new Date(today.getTime() - (1000*60*60*(23 - index)))),
      $gte: new Date(new Date(today.getTime() - (1000*60*60*(24 - index))))
    }
    const hour = await measurementService.getQueryMeasurements(q, req.params.sensorName)
    hour.forEach(min => {
      total += min.data
      i++
    });
    const data = {
      timestamp: new Date(new Date(today.getTime() - (1000*60*60*(24 - index)))),
      sensorName: 'Sensor-1',
      data: total / i
    }
    i = 0
    total = 0
    day.push(data)
  }
  res.json(day)
}

exports.getLastWeekMesurement = async (req, res, next) => {
  let week = [];
  let i = 0;
  let total = 0;
  var today = new Date();
  today.setHours(24, 0, 0, 0)
  for (let index = 0; index < 7; index++) {
    let q = {
      $lte: new Date(new Date(today.getTime() - (1000*60*60*24*(6 - index)))),
      $gte: new Date(new Date(today.getTime() - (1000*60*60*24*(7 - index))))
    }
    const day = await measurementService.getQueryMeasurements(q, req.params.sensorName)
    day.forEach(min => {
      total += min.data
      i++
    });
    const data = {
      timestamp: new Date(new Date(today.getTime() - (1000*60*60*24*(7 - index)))),
      sensorName: 'Sensor-1',
      data: total / i
    }
    i = 0
    total = 0
    week.push(data)
  }
  res.json(week)
}

exports.setMeasurement = async (req, res, next) => {
  await measurementService.setMeasurement(
    req.body.capacity,
    req.params.sensorName
  );
  res.status(200);
  res.json("Success");
};

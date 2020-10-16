const Sensor = require("../models/sensor");

exports.getSensors = async () => {
    return await Sensor.find();
};

exports.getSensorId = async(SensorName) => {
    if (sensorName === undefined ||  sensorName === null) {
        return -1
    }
    res = await Sensor.findOne({'sensorName': sensorName}, (err, res) =>  {
        return res;
    })
    return res._id
}

exports.setSensor = async (sensorName) => {
    if (sensorName === undefined ||  sensorName === null) {
        return -1
    }
    res = await Sensor.findOne({'sensorName': sensorName}, (err, res) =>  {
        return res;
    })
    if (res !== null && res.sensorName === sensorName) {
        return -2
    }
  
    const currentDate = new Date().getTime()

    return await updateSensor(Sensor, currentDate, sensorName);
};

const updateSensor = async (collection, timestamp, sensorName) => {
    return await collection.updateOne(
      {
        timestamp,
      },
      {
        sensorName,
      },
      {
        upsert: true,
      }
    );
  };
  


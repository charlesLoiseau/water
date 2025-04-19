const Sensor = require("../models/sensor");

exports.getSensors = async () => {
    return await Sensor.find();
};

exports.getSensorId = async(sensorName) => {
    if (sensorName === undefined ||  sensorName === null) {
        return -1
    }
    try {
      const res = await Sensor.findOne({'sensorName': sensorName});
      return res._id;
    } catch (error) {
      console.log(error);
      return -1
    }
    
}

exports.setSensor = async (sensorName) => {
    if (sensorName === undefined ||  sensorName === null) {
        return -1
    }
    const res = await Sensor.findOne({'sensorName': sensorName});
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
  


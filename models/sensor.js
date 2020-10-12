const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SensorModel = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    require: true,
  },
  sensorName: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("sensors", SensorModel);
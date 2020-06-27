const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeasurementModel = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    require: true,
  },
  data: {
    type: Number,
    require: true,
  },
  sensorName: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("measurements", MeasurementModel);

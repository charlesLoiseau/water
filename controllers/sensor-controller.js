const sensorService = require("../services/sensor-service");

exports.getSensors = async (req, res, next) => {
    res.json(await sensorService.getSensors());
}

exports.setSensor = async (req, res, next) => {
    if (req.body.sensorName === undefined || req.body.sensorName === null) {
        res.status(400).send({error: "sensorName required"})
        return;
    }
    result = await sensorService.setSensor(req.body.sensorName)
    if (result === -1) {
        res.status(400).send({error: "sensorName required"})
        return;
    }
    if (result === -2) {
        res.status(400).send({error: "sensorName already exist"})
        return;
    }
    res.status(200);
    res.json("Success");
}
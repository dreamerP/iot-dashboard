const sensorService = require('../services/sensorService');

exports.getAllSensors = (req, res) => {
  const sensors = sensorService.getAllSensors();
  res.json(sensors);
};

exports.getSensorById = (req, res) => {
  const sensor = sensorService.getSensorById(req.params.id);
  if (!sensor) {
    return res.status(404).json({ message: 'Sensor not found' });
  }
  res.json(sensor);
};

exports.createSensor = (req, res) => {
  const newSensor = sensorService.createSensor(req.body);
  res.status(201).json(newSensor);
};

exports.updateSensor = (req, res) => {
  const updatedSensor = sensorService.updateSensor(req.params.id, req.body);
  if (!updatedSensor) {
    return res.status(404).json({ message: 'Sensor not found' });
  }
  res.json(updatedSensor);
};

exports.deleteSensor = (req, res) => {
  const isDeleted = sensorService.deleteSensor(req.params.id);
  if (!isDeleted) {
    return res.status(404).json({ message: 'Sensor not found' });
  }
  res.status(204).send();
};

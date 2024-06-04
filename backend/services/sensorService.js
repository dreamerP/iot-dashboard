const fs = require('fs');
const path = require('path');
const sensorsFilePath = path.join(__dirname, '../utils/data/sensors.json');

let sensors = JSON.parse(fs.readFileSync(sensorsFilePath, 'utf-8'));

exports.getAllSensors = () => {
  return sensors;
};

exports.getSensorById = (id) => {
  return sensors.find(sensor => sensor.id === id);
};

exports.createSensor = (sensorData) => {
  const newSensor = { id: String(sensors.length + 1), ...sensorData };
  sensors.push(newSensor);
  fs.writeFileSync(sensorsFilePath, JSON.stringify(sensors, null, 2));
  return newSensor;
};

exports.updateSensor = (id, sensorData) => {
  const index = sensors.findIndex(sensor => sensor.id === id);
  if (index === -1) {
    return null;
  }
  sensors[index] = { ...sensors[index], ...sensorData };
  fs.writeFileSync(sensorsFilePath, JSON.stringify(sensors, null, 2));
  return sensors[index];
};

exports.deleteSensor = (id) => {
  const index = sensors.findIndex(sensor => sensor.id === id);
  if (index === -1) {
    return false;
  }
  sensors.splice(index, 1);
  fs.writeFileSync(sensorsFilePath, JSON.stringify(sensors, null, 2));
  return true;
};

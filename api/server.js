// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let sensors = [
  { id: 1, type: 'Temperature', driver: 'Driver1', status: 1, value: 22.5 },
  { id: 2, type: 'Humidity1', driver: 'Driver2', status: 0, value: 51 },
  { id: 3, type: 'Humidity2', driver: 'Driver3', status: 1, value: 52 },
  { id: 4, type: 'Humidity3', driver: 'Driver3', status: 0, value: 53 },
  { id: 5, type: 'Humidity4', driver: 'Driver5', status: 1, value: 54 },
];

// Get all sensors
app.get('/sensors', (req, res) => {
  res.json(sensors);
});

// Get a specific sensor by ID
app.get('/sensors/:id', (req, res) => {
  const sensor = sensors.find(s => s.id === parseInt(req.params.id));
  if (sensor) {
    res.json(sensor);
  } else {
    res.status(404).send('Sensor not found');
  }
});

// Create a new sensor
app.post('/sensors', (req, res) => {
  const newSensor = { id: sensors.length + 1, ...req.body };
  sensors.push(newSensor);
  res.status(201).json(newSensor);
});

// Update an existing sensor
app.put('/sensors/:id', (req, res) => {
  const sensorIndex = sensors.findIndex(s => s.id === parseInt(req.params.id));
  if (sensorIndex !== -1) {
    sensors[sensorIndex] = { ...sensors[sensorIndex], ...req.body };
    res.json(sensors[sensorIndex]);
  } else {
    res.status(404).send('Sensor not found');
  }
});

// Delete a sensor
app.delete('/sensors/:id', (req, res) => {
  sensors = sensors.filter(s => s.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

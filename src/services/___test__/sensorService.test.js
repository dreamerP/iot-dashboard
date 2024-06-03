import sensorService from '../sensorService';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('sensorService', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should get all sensors', async () => {
    mock.onGet('http://localhost:5000/sensors').reply(200, [{ type: 'Temperature' }]);
    const sensors = await sensorService.getAllSensors();
    expect(sensors).toHaveLength(1);
    expect(sensors[0].type).toEqual('Temperature');
  });

  it('should create a new sensor', async () => {
    const newSensor = { type: 'Humidity', driver: 'Driver2', status: 1, value: 60 };
    mock.onPost('http://localhost:5000/sensors').reply(201, newSensor);
    const response = await sensorService.createSensor(newSensor);
    expect(response.type).toEqual('Humidity');
  });

  it('should update a sensor', async () => {
    const updatedSensor = { type: 'Temperature Updated', driver: 'Driver2', status: 1, value: 70 };
    mock.onPut('http://localhost:5000/sensors/1').reply(200, updatedSensor);
    const response = await sensorService.updateSensor(1, updatedSensor);
    expect(response.type).toEqual('Temperature Updated');
  });

  it('should delete a sensor', async () => {
    mock.onDelete('http://localhost:5000/sensors/1').reply(200, { message: 'Sensor deleted successfully' });
    const response = await sensorService.deleteSensor(1);
    expect(response.message).toEqual('Sensor deleted successfully');
  });
});

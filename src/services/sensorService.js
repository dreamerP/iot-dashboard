import axios from 'axios';
import { publishMessage, subscribeToMessages } from './natsService';

const API_URL = 'http://localhost:5000';
let instance = null;

class SensorService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async getAllSensors() {
    try {
      const response = await axios.get(`${API_URL}/sensors`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los sensores:', error);
      throw error;
    }
  }

  async createSensor(sensor) {
    try {
      const response = await axios.post(`${API_URL}/sensors`, sensor);
      //await publishMessage('sensor.created', sensor);
      return response.data;
    } catch (error) {
      console.error('Error al crear el sensor:', error);
      throw error;
    }
  }

  async updateSensor(id, sensor) {
    try {
      const response = await axios.put(`${API_URL}/sensors/${id}`, sensor);
      //await publishMessage('sensor.updated', sensor);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el sensor:', error);
      throw error;
    }
  }

  async deleteSensor(id) {
    try {
      const response = await axios.delete(`${API_URL}/sensors/${id}`);
      //await publishMessage('sensor.deleted', { id });
      return response.data
    } catch (error) {
      console.error('Error al eliminar el sensor:', error);
      throw error;
    }
  }

  async subscribeToSensorMessages(topic, callback) {
    await subscribeToMessages(topic, callback);
  }
}

const sensorService = new SensorService();
export default sensorService;

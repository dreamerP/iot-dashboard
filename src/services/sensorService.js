import axios from "@/core/axios/Axios";
import natsService from '@/services/natsService';

let instance = null;

class SensorService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async getAllSensors() {
    const response = await axios.get(`/sensors`);
    return response.data;
  }

  async createSensor(sensor) {
    const response = await axios.post(`/sensors`, sensor);
    await natsService.publish("sensor.created", sensor);
    return response.data;
  }

  async updateSensor(id, sensor) {
    const response = await axios.put(`/sensors/${id}`, sensor);
    await natsService.publish("sensor.updated", sensor);
    return response.data;
  }

  async deleteSensor(id) {
    const response = await axios.delete(`/sensors/${id}`);
    await natsService.publish("sensor.deleted", { id });
    return response.data;
  }

  async subscribeToSensorMessages(topic, callback) {
    await natsService.subscribe(topic, callback);
  }
}

const sensorService = new SensorService();
export default sensorService;

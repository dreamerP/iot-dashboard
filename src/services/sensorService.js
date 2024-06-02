import axios from 'axios';
import { connect, JSONCodec } from 'nats.ws';

const API_URL = 'http://localhost:5000';
let instance = null;

class SensorService {
  constructor() {
    if (!instance) {
      instance = this;
      this.nc = null;
      this.codec = JSONCodec();
      this.initNats();
    }
    return instance;
  }

  async initNats() {
    try {
      this.nc = await connect({ servers: 'ws://localhost:8080' });
      console.log('Conectado a NATS');
    } catch (error) {
      console.error('Error al conectar a NATS:', error);
      throw error;
    }
  }

  async publishToNats(topic, message) {
    if (!this.nc) {
      await this.initNats();
    }
    this.nc.publish(topic, this.codec.encode(message));
  }

  async subscribeToNats(topic, callback) {
    if (!this.nc) {
      await this.initNats();
    }
    const sub = this.nc.subscribe(topic);
    (async () => {
      for await (const msg of sub) {
        callback(this.codec.decode(msg.data));
      }
    })();
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
      await this.publishToNats('sensor.created', sensor);
      return response.data;
    } catch (error) {
      console.error('Error al crear el sensor:', error);
      throw error;
    }
  }

  async updateSensor(id, sensor) {
    try {
      const response = await axios.put(`${API_URL}/sensors/${id}`, sensor);
      await this.publishToNats('sensor.updated', sensor);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el sensor:', error);
      throw error;
    }
  }

  async deleteSensor(id) {
    try {
      await axios.delete(`${API_URL}/sensors/${id}`);
      await this.publishToNats('sensor.deleted', { id });
    } catch (error) {
      console.error('Error al eliminar el sensor:', error);
      throw error;
    }
  }
}

//He utilizado el patrón singleton aquí para evitar la instanciación de múltiples conexiones y mejorar la eficiencia

const sensorService = new SensorService();
export default sensorService;

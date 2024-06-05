import axios from "@/core/axios/Axios";
import natsService from "@/services/natsService";

let instance = null;

/**
 * SensorService
 *
 * Servicio singleton para gestionar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * en sensores y publicar eventos a través de NATS.
 */
class SensorService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  /**
   * Verifica la conexión a NATS antes de proceder con cualquier operación.
   *
   * @throws {Error} Error si no hay conexión a NATS.
   */
  async checkNatsConnection() {
    if (!natsService.isConnected()) {
      try {
        await natsService.connect();
      } catch (error) {
        throw new Error(
          "Cannot proceed: NATS connection error. " + error.message
        );
      }
    }
  }

  /**
   * Obtiene todos los sensores.
   *
   * @returns {Promise<Object[]>} Una promesa que resuelve con un array de sensores.
   * @throws {Error} Error durante la obtención de los sensores.
   */
  async getAllSensors() {
    const response = await axios.get(`/sensors`);
    return response.data;
  }

  /**
   * Crea un nuevo sensor.
   *
   * @param {Object} sensor - Los datos del sensor a crear.
   * @returns {Promise<Object>} Una promesa que resuelve con los datos del sensor creado.
   * @throws {Error} Error durante la creación del sensor.
   */
  async createSensor(sensor) {
    await this.checkNatsConnection();
    const response = await axios.post(`/sensors`, sensor);
    await natsService.publish("sensor.created", sensor);
    return response.data;
  }

  /**
   * Actualiza un sensor existente.
   *
   * @param {number} id - El ID del sensor a actualizar.
   * @param {Object} sensor - Los nuevos datos del sensor.
   * @returns {Promise<Object>} Una promesa que resuelve con los datos actualizados del sensor.
   * @throws {Error} Error durante la actualización del sensor.
   */
  async updateSensor(id, sensor) {
    await this.checkNatsConnection();
    const response = await axios.put(`/sensors/${id}`, sensor);
    await natsService.publish("sensor.updated", sensor);
    return response.data;
  }

  /**
   * Elimina un sensor.
   *
   * @param {number} id - El ID del sensor a eliminar.
   * @returns {Promise<Object>} Una promesa que resuelve con los datos del sensor eliminado.
   * @throws {Error} Error durante la eliminación del sensor.
   */
  async deleteSensor(id) {
    await this.checkNatsConnection();
    const response = await axios.delete(`/sensors/${id}`);
    await natsService.publish("sensor.deleted", { id });
    return response.data;
  }
}

const sensorService = new SensorService();
export default sensorService;

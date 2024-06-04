import axios from "@/core/axios/Axios";
import natsService from "@/services/natsService";

let instance = null;

/**
 * ElementService
 *
 * Servicio singleton para gestionar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * en elementos y publicar eventos a través de NATS.
 */
class ElementService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  /**
   * Obtiene todos los elementos.
   *
   * @returns {Promise<Object[]>} Una promesa que resuelve con un array de elementos.
   * @throws {Error} Error durante la obtención de los elementos.
   */
  async getAllElements() {
    const response = await axios.get(`/elements`);
    return response.data;
  }

  /**
   * Crea un nuevo elemento.
   *
   * @param {Object} element - Los datos del elemento a crear.
   * @returns {Promise<Object>} Una promesa que resuelve con los datos del elemento creado.
   * @throws {Error} Error durante la creación del elemento.
   */
  async createElement(element) {
    const response = await axios.post(`/elements`, element);
    await natsService.publish("element.created", element);
    return response.data;
  }

  /**
   * Actualiza un elemento existente.
   *
   * @param {number} id - El ID del elemento a actualizar.
   * @param {Object} element - Los nuevos datos del elemento.
   * @returns {Promise<Object>} Una promesa que resuelve con los datos actualizados del elemento.
   * @throws {Error} Error durante la actualización del elemento.
   */
  async updateElement(id, element) {
    const response = await axios.put(`/elements/${id}`, element);
    await natsService.publish("element.updated", element);
    return response.data;
  }

  /**
   * Elimina un elemento.
   *
   * @param {number} id - El ID del elemento a eliminar.
   * @returns {Promise<Object>} Una promesa que resuelve con los datos del elemento eliminado.
   * @throws {Error} Error durante la eliminación del elemento.
   */
  async deleteElement(id) {
    const response = await axios.delete(`/elements/${id}`);
    await natsService.publish("element.deleted", { id });
    if (response) {
      return response.data;
    } else {
      throw new Error("Failed to delete element");
    }
  }
}

const elementService = new ElementService();
export default elementService;

import { connect, StringCodec } from "nats.ws";

/**
 * NatsService
 *
 * Servicio para gestionar la conexión y comunicación con un servidor NATS,
 * incluyendo la publicación y suscripción a mensajes.
 */
class NatsService {
  constructor() {
    this.nc = null;
    this.sc = StringCodec();
  }

  /**
   * Establece una conexión con el servidor NATS.
   *
   * @returns {Promise<void>}
   * @throws {Error} Error durante la conexión con el servidor NATS.
   */
  async connect() {
    if (!this.nc) {
      const timeout = 3000; 
      const connectPromise = connect({ servers: "ws://localhost:8080" });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Connection to NATS timed out")), timeout)
      );

      try {
        this.nc = await Promise.race([connectPromise, timeoutPromise]);
      } catch (error) {
        throw new Error("Unable to connect to NATS server: " + error.message);
      }
    }
  }
  /**
   * Verifica si hay una conexión activa con el servidor NATS.
   *
   * @returns {boolean} `true` si hay una conexión activa, `false` en caso contrario.
   */
  isConnected() {
    return this.nc !== null;
  }
  /**
   * Publica un mensaje en un tema específico.
   *
   * @param {string} subject - El tema en el que se publicará el mensaje.
   * @param {Object} message - El mensaje a publicar.
   * @returns {Promise<void>}
   * @throws {Error} Error durante la publicación del mensaje.
   */
  async publish(subject, message) {
    try {
      await this.connect();
      this.nc.publish(subject, this.sc.encode(JSON.stringify(message)));
    } catch (error) {
      throw new Error("Failed to publish message: " + error.message);
    }
  }

  /**
   * Se suscribe a un tema específico y ejecuta un callback para cada mensaje recibido.
   *
   * @param {string} subject - El tema al que suscribirse.
   * @param {function(Object): void} callback - La función a ejecutar para cada mensaje recibido.
   * @returns {Promise<void>}
   * @throws {Error} Error durante la suscripción o recepción de mensajes.
   */
  async subscribe(subject, callback) {
    try {
      await this.connect();
      const sub = this.nc.subscribe(subject);
      for await (const msg of sub) {
        callback(JSON.parse(this.sc.decode(msg.data)));
      }
    } catch (error) {
      throw new Error("Failed to subscribe to subject: " + error.message);
    }
  }
}

const natsService = new NatsService();
export default natsService;

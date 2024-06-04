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

  async connect() {
    if (!this.nc) {
      this.nc = await connect({ servers: "ws://localhost:8080" });
    }
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
    await this.connect();
    this.nc.publish(subject, this.sc.encode(JSON.stringify(message)));
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
    await this.connect();
    const sub = this.nc.subscribe(subject);
    for await (const msg of sub) {
      callback(JSON.parse(this.sc.decode(msg.data)));
    }
  }
}

const natsService = new NatsService();
export default natsService;

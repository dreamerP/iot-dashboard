import { connect, StringCodec } from 'nats.ws';

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

  async publish(subject, message) {
    await this.connect();
    this.nc.publish(subject, this.sc.encode(JSON.stringify(message)));
  }

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

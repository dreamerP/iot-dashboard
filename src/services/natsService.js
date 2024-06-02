// src/services/natsService.js
import { connect, StringCodec } from 'nats.ws';

const sc = StringCodec();

let nc;

export const connectNats = async () => {
  nc = await connect({ servers: "ws://localhost:8080" });
};

export const publishMessage = async (subject, message) => {
  if (!nc) await connectNats();
  nc.publish(subject, sc.encode(JSON.stringify(message)));
};

export const subscribeToMessages = async (subject, callback) => {
  if (!nc) await connectNats();
  const sub = nc.subscribe(subject);
  for await (const msg of sub) {
    callback(JSON.parse(sc.decode(msg.data)));
  }
};

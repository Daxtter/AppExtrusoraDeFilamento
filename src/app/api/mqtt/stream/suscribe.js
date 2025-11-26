// lib/mqttClient.js
import { rejects } from "assert";
import mqtt from "mqtt";
import { resolve } from "path";

const brokerUrl = "wss://3e4cbabcc345437a90cc4559b7af4b9d.s1.eu.hivemq.cloud:8884/mqtt"; // Usa WebSocket en frontend

let client = undefined;
let clienteUnaVez;

export function subscribeMQTT(topic, onMessage) {
  if (client)
    if (client.connect)
      return client

  client = mqtt.connect(brokerUrl, {
    clientId: "cliente_web_" + Math.random().toString(16).substr(2, 8),
    username: "Superesp32",
    password: "Esp32esp",
    clean: true,
    connectTimeout: 10000,
  });

  client.on("connect", () => {
    console.log("Conectado al broker MQTT");
    client.subscribe(topic, (err) => {
      if (!err) console.log(`Suscrito al topic: ${topic}`);
    });
  });

  client.on("message", (topic, message) => {
    const data = message.toString();
    // Llama al callback con el nuevo mensaje
    if (onMessage) onMessage(data);
  });

  client.on("error", (err) => {
    console.error("Error MQTT al suscribirse:", err);
  });

  return client; // Devuelve el cliente, no el mensaje
}







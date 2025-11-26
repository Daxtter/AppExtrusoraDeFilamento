import mqtt from "mqtt";
const brokerUrl = "wss://3e4cbabcc345437a90cc4559b7af4b9d.s1.eu.hivemq.cloud:8884/mqtt"; // 10.42.0.1, ws://test.mosquitto.org:8080/mqtt

    // Publicar el mensaje MQTT
const options = {
  clientId: "cliente_web_" + Math.random().toString(16).substr(2, 8),
  username: "Superesp32",
  password: "Esp32esp",
  clean: true,
  connectTimeout: 10000,
  reconnectPeriod: 1000,
};

const mqttClient = mqtt.connect(brokerUrl, options);

export function PublicarElMensaje(topic, message) {
  try {
    mqttClient.publish(topic, message);
    console.log("Comando MQTT enviado:", { topic, message });
  } catch (error) {
    console.error("❌ Error al publicar MQTT:", error);
   }
}

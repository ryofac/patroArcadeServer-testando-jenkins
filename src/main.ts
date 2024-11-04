import app, { disconnectPlayer, getConnectedPlayerId } from "./app";
import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT || 3000;
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 4999;

// TODO: Analisar se é seguro nao usar a lib http.

// Mapa de clientes conectados ao WebSocket (fliperamas)
export const clients = new Map();

// Inicializa o servidor WebSocket
export const wss = new WebSocketServer({ port: Number(WEBSOCKET_PORT) });

// Eventos de conexão do WebSocket
wss.on("connection", (ws) => {
  // Gera um ID único para o cliente
  //   const clientId = uuidv4();
  const clientId = clients.size;
  // Adiciona o cliente ao mapa de clientes
  clients.set(clientId, { ws, players: [], id: clients.size });

  console.log("Cliente WebSocket conectado:", clientId);
  ws.send(
    JSON.stringify({
      type: "connected",
      content: { clientId },
    })
  );

  ws.on("message", (message) => {
    console.log("Mensagem recebida:", message);
  });

  ws.on("close", () => {
    console.log("Cliente desconectado:", clientId);
    // Remover o cliente do mapa de clientes
    clients.delete(clientId);
  });
});

app.listen(PORT, () => {
  console.clear();
  console.log(`PatroTCC rodando: ${PORT}`);
  // TODO: Verificar onde informar a execuçção do server ws.
  console.log(`WebSocket rodando: ${WEBSOCKET_PORT}`);
});

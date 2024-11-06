import app, { disconnectPlayer, getConnectedPlayerId } from "./app";
import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import http from "http";

const PORT = process.env.PORT || 3001;

// Mapa de clientes conectados ao WebSocket (fliperamas)
export const clients = new Map();

// Cria o servidor http
const server = http.createServer(app);

// Inicializa o servidor WebSocket
export const wss = new WebSocketServer({ server });

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

server.listen(PORT, () => {
  console.clear();
  console.log(`PatroTCC rodando: ${PORT}`);
});

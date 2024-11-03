"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = exports.clients = void 0;
const app_1 = __importDefault(require("./app"));
const ws_1 = require("ws");
const uuid_1 = require("uuid");
const PORT = 3001;
const WEBSOCKET_PORT = 4999;
// TODO: Analisar se é seguro nao usar a lib http.
// Mapa de clientes conectados ao WebSocket (fliperamas)
exports.clients = new Map();
// Inicializa o servidor WebSocket
exports.wss = new ws_1.WebSocketServer({ port: WEBSOCKET_PORT });
// Eventos de conexão do WebSocket
exports.wss.on("connection", (ws) => {
    // Gera um ID único para o cliente
    const clientId = (0, uuid_1.v4)();
    // Adiciona o cliente ao mapa de clientes
    exports.clients.set(clientId, { ws, players: [], id: exports.clients.size });
    console.log("Cliente WebSocket conectado:", clientId);
    ws.send(JSON.stringify({
        type: "connected",
        content: { clientId },
    }));
    ws.on("message", (message) => {
        console.log("Mensagem recebida:", message);
    });
    ws.on("close", () => {
        console.log("Cliente desconectado:", clientId);
        // Remover o cliente do mapa de clientes
        exports.clients.delete(clientId);
    });
});
app_1.default.listen(PORT, () => {
    console.clear();
    console.log(`PatroTCC rodando: ${PORT}`);
    // TODO: Verificar onde informar a execuçção do server ws.
    console.log(`WebSocket rodando: ${WEBSOCKET_PORT}`);
});

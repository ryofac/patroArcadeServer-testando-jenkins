"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = exports.clients = void 0;
const app_1 = __importDefault(require("./app"));
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const PORT = process.env.PORT || 3001;
// Mapa de clientes conectados ao WebSocket (fliperamas)
exports.clients = new Map();
// Cria o servidor http
const server = http_1.default.createServer(app_1.default);
// Inicializa o servidor WebSocket
exports.wss = new ws_1.WebSocketServer({ server });
// Eventos de conexão do WebSocket
exports.wss.on("connection", (ws) => {
    // Gera um ID único para o cliente
    //   const clientId = uuidv4();
    const clientId = exports.clients.size;
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
server.listen(PORT, () => {
    console.clear();
    console.log(`PatroTCC rodando: ${PORT}`);
});

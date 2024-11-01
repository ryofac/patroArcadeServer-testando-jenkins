"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
const app_1 = __importStar(require("./app"));
const ws_1 = require("ws");
const uuid_1 = require("uuid");
const PORT = 3001;
const WEBSOCKET_PORT = 4999;
// TODO: Analisar se é seguro nao usar a lib http.
// Mapa de clientes conectados ao WebSocket (fliperamas)
const clients = new Map();
// Inicializa o servidor WebSocket
exports.wss = new ws_1.WebSocketServer({ port: WEBSOCKET_PORT });
// Eventos de conexão do WebSocket
exports.wss.on("connection", (ws) => {
    // Gera um ID único para o cliente
    const clientId = (0, uuid_1.v4)();
    // Adiciona o cliente ao mapa de clientes
    clients.set(clientId, ws);
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
        if ((0, app_1.getConnectedPlayerId)() !== null) {
            let connectedPlayerId = (0, app_1.getConnectedPlayerId)();
            console.log(`Desconectando jogador ${connectedPlayerId}`);
            (0, app_1.disconnectPlayer)(connectedPlayerId);
        }
        // Remover o cliente do mapa de clientes
        clients.delete(clientId);
    });
});
app_1.default.listen(PORT, () => {
    console.clear();
    console.log(`PatroTCC rodando: ${PORT}`);
    // TODO: Verificar onde informar a execuçção do server ws.
    console.log(`WebSocket rodando: ${WEBSOCKET_PORT}`);
});

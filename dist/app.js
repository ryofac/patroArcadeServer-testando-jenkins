"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectedPlayerId = exports.disconnectPlayer = exports.connectPlayer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const playerRoutes_1 = require("./routes/playerRoutes");
const leaderboardRoutes_1 = require("./routes/leaderboardRoutes");
const scoreRoutes_1 = require("./routes/scoreRoutes");
const loginRoutes_1 = require("./routes/loginRoutes");
const logoutRoutes_1 = require("./routes/logoutRoutes");
const arcadeLoginRoutes_1 = require("./routes/arcadeLoginRoutes");
const main_1 = require("./main");
const debugRoutes_1 = require("./routes/debugRoutes");
const userService_1 = require("./services/userService");
const body_parser_1 = __importDefault(require("body-parser"));
const loginExceptions_1 = require("./exceptions/loginExceptions");
const clientService_1 = require("./services/clientService");
// Criar a instância do Express
const app = (0, express_1.default)();
// Middleware de limitação de requisições
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Configurar rotas
app.use("/player", playerRoutes_1.playerRoutes);
app.use("/leaderboard", leaderboardRoutes_1.leaderboardRoutes);
app.use("/score", scoreRoutes_1.scoreRoutes);
app.use("/login", loginRoutes_1.loginRoutes);
app.use("/arcadeLogin", arcadeLoginRoutes_1.arcadeLoginRoutes);
app.use("/logout", logoutRoutes_1.logoutRoutes);
app.use("/debug", debugRoutes_1.debugRoutes);
// TODO: Configurar sessões
// Função para conectar o jogador num fliperama específico
function connectPlayer(userId, clientId) {
    if (!(0, clientService_1.clientExists)(clientId)) {
        throw new loginExceptions_1.ClientNotFoundException();
    }
    if ((0, userService_1.isAlreadyConnected)(userId)) {
        throw new loginExceptions_1.AlreadyConnectedException();
    }
    if ((0, userService_1.isClientFull)(clientId)) {
        throw new loginExceptions_1.ClientFullException();
    }
}
exports.connectPlayer = connectPlayer;
// Função para desconectar o jogador
function disconnectPlayer(playerId) {
    main_1.clients.forEach((client) => {
        // Remover o jogador da lista de players do cliente.
        console.log(client.players);
        if (client.players.includes(playerId)) {
            client.players.splice(client.players.indexOf(playerId), 1);
            console.log(`[DISCONNECT] Player ${playerId} disconnected from client ${client.id}.`);
        }
    });
}
exports.disconnectPlayer = disconnectPlayer;
function getConnectedPlayerId() {
    return "a";
    //   return connectedPlayerId;
}
exports.getConnectedPlayerId = getConnectedPlayerId;
// Definir rota inicial:
app.get("/", (req, res) => {
    console.log("Rota inicial acessada");
    res.json({
        type: "connected",
        content: "Bem-vindo ao servidor.",
    });
});
exports.default = app;

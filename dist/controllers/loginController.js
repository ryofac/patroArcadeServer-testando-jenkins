"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryToLogin = void 0;
const userService_1 = require("../services/userService");
const app_1 = require("../app");
const main_1 = require("../main");
const playerService_1 = require("../services/playerService");
const appError_1 = __importDefault(require("../exceptions/appError"));
function tryToLogin(req, res) {
    // Analisar credenciais recebidas
    const { username, password } = req.body;
    const clientId = parseInt(req.params.clientId);
    console.log(`[LOGIN ATTEMPT]: ID: ${clientId} - ${username} : ${password}.`);
    // Verificar se as credenciais são válidas
    if ((0, userService_1.checkCredentials)(username, password)) {
        try {
            const _userId = (0, userService_1.getUserDataByUserName)(username).id;
            // Verifica se já existe um player conectado.
            (0, app_1.connectPlayer)(_userId, clientId);
        }
        catch (error) {
            if (error instanceof appError_1.default) {
                res.status(error.statusCode).json({
                    type: "loginFailed",
                    content: error.message,
                });
            }
            console.log(`[LoginController] [tryToLogin] ${error.message}.`);
            return;
        }
        // Tudo dando certo, retorna o player.
        res.status(200);
        const playerData = (0, playerService_1.getPlayerByUserId)((0, userService_1.getUserDataByUserName)(username).id);
        res.json({
            type: "loginSuccess",
            content: playerData,
        });
        // Enviar mensagem para o Client Websocket desejado:
        main_1.clients.forEach((client) => {
            if (client.id === clientId) {
                client.ws.send(JSON.stringify({
                    type: "playerJoined",
                    content: playerData,
                }));
            }
        });
        // Atualizar array de players do cliente.
        main_1.clients.forEach((client) => {
            if (client.id === clientId) {
                client.players.push(playerData.userId);
            }
        });
        console.log("[LoginController] [tryToLogin] Login bem-sucedido.");
    }
    else {
        // Se as credenciais não forem válidas, retorna um erro.
        res.status(401);
        res.json({
            type: "loginFailed",
            content: "Credenciais inválidas.",
        });
        console.log("Login falhou.");
    }
}
exports.tryToLogin = tryToLogin;

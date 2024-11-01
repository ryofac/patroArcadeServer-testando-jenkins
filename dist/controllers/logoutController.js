"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const app_1 = require("../app");
const main_1 = require("../main");
const userService_1 = require("../services/userService");
function logout(req, res) {
    const { username } = req.body;
    try {
        (0, app_1.disconnectPlayer)(username);
    }
    catch (error) {
        console.error(`[LOGOUT] Erro ao desconectar jogador ${username}: ${error.message}`);
        return res.status(400).json({
            type: "logoutError",
            content: error.message,
        });
    }
    // Logout bem-sucedido
    res.status(200).json({
        type: "logoutSuccess",
        content: `[LOGOUT] Logout do jogador ${username} realizado com sucesso.`,
    });
    main_1.wss.clients.forEach((client) => {
        client.send(JSON.stringify({
            type: "playerLeft",
            content: {
                userId: (0, userService_1.getUserDataByUserName)(username).id,
            },
        }));
    });
    console.log(`[LOGOUT] Jogador ${username} desconectado.`);
}
exports.logout = logout;

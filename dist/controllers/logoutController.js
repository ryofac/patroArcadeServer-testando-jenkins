"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const app_1 = require("../app");
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
    res.status(200).json({
        type: "logoutSuccess",
        content: `[LOGOUT] Logout do jogador ${username} realizado com sucesso.`,
    });
    console.log(`[LOGOUT] Jogador ${username} desconectado.`);
}
exports.logout = logout;

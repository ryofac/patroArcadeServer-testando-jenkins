"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryToLogin = void 0;
const userService_1 = require("../services/userService");
const app_1 = require("../app");
function tryToLogin(req, res) {
    // Analisar credenciais recebidas
    const { username, password } = req.body;
    console.log(`Tentativa de login com credenciais: ${username} e senha ${password}.`);
    // Verificar se as credenciais são válidas
    if ((0, userService_1.checkCredentials)(username, password)) {
        // Verifica se já existe um player conectado.
        if ((0, app_1.connectPlayer)(username)) {
            res.status(200);
            res.json({
                type: "loginSuccess",
                content: "Login bem-sucedido.",
            });
            console.log("Login bem-sucedido.");
        }
        else {
            res.status(403).json({
                type: "loginFailed",
                content: "Já existe um jogador conectado. Tente novamente mais tarde.",
            });
            console.log(`Tentativa de login rejeitada para ${username}. Já existe um jogador conectado.`);
        }
    }
    else {
        res.status(401);
        res.json({
            type: "loginFailed",
            content: "Credenciais inválidas.",
        });
        console.log("Login falhou.");
    }
}
exports.tryToLogin = tryToLogin;

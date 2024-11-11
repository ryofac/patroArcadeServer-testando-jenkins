"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryToLoginArcade = void 0;
const userService_1 = require("../services/userService");
const arcadeService_1 = require("../services/arcadeService");
const loginExceptions_1 = require("../exceptions/loginExceptions");
function tryToLoginArcade(req, res) {
    // Analisa credenciais recebidas.
    const clientTempId = req.params.clientTempId;
    const { username, password } = req.body;
    console.log(`[ADMIN LOGIN ATTEMPT]: Temp ID: ${clientTempId} \n${username} : ${password}.`);
    try {
        // Verifica se as credenciais são válidas.
        if ((0, userService_1.checkCredentials)(username, password)) {
            // Credenciais válidas. Checando se é um admin.
            const user = (0, userService_1.getUserDataByUserName)(username);
            if (user.role !== "admin") {
                throw loginExceptions_1.UserIsNotAdminException;
            }
            // Se as credenciais forem válidas, retorna sucesso.
            res.status(200);
            res.json({
                type: "loginSuccess",
                content: {
                    username: username,
                    role: "admin",
                    clientTempId: clientTempId,
                },
            });
            // Atualiza o identificador do fliperama.
            const id = user.arcades[0]; // TODO: Tratamento para quando o usuário tiver mais de um fliperama. (arcades.length > 1)
            (0, arcadeService_1.updateArcadeIdentifier)(id, clientTempId);
        }
        else {
            // Se as credenciais não forem válidas, retorna erro.
        }
    }
    catch (error) {
        res.status(error.statusCode);
        res.json({
            type: "arcadeLoginError",
            content: error.message,
        });
    }
}
exports.tryToLoginArcade = tryToLoginArcade;

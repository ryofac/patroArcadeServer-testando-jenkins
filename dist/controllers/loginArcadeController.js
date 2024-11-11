"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLoginPage = exports.tryToLoginArcade = void 0;
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
function generateLoginPage(req, res) {
    const clientId = parseInt(req.params.clientId);
    console.log(`Gerando página de login para o cliente ${clientId}.`);
    res.send(`
            <!DOCTYPE html>
            <html>
                    <head>
                            <title>Login</title>
                    </head>
                    <body>
                            <h2>Login</h2>
                            <form id="loginForm" action="/login/${clientId}" method="post">
                                    <label for="username">Username:</label><br>
                                    <input type="text" id="username" name="username"><br>
                                    <label for="password">Password:</label><br>
                                    <input type="password" id="password" name="password"><br><br>
                                    <input type="submit" value="Submit">
                            </form>
                            <script>
                                    document.getElementById('loginForm').addEventListener('submit', function(event) {
                                            event.preventDefault();
                                            const username = document.getElementById('username').value;
                                            const password = document.getElementById('password').value;
                                            fetch('/login/${clientId}', {
                                                    method: 'POST',
                                                    headers: {
                                                            'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({ username, password })
                                            })
                                            .then(response => response.json())
                                            .then(data => {
                                                    if (data.type === 'loginSuccess') {
                                                            console.log('Login successful!');
                                                    } else {
                                                            console.log('Login failed: ' + data.content);
                                                    }
                                            })
                                            .catch(error => {
                                                    console.error('Error:', error);
                                            });
                                    });
                            </script>
                    </body>
            </html>
    `);
}
exports.generateLoginPage = generateLoginPage;

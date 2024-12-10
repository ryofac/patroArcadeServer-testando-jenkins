import { Request, Response } from "express";
import {
  checkCredentials,
  getUserDataByUserName,
} from "../services/userService";
import { updateArcadeIdentifier } from "../services/arcadeService";
import { UserIsNotAdminException } from "../exceptions/loginExceptions";
import { AdminUser } from "../models/usersDatabase";

export function tryToLoginArcade(req: Request, res: Response) {
  // Analisa credenciais recebidas.
  const clientTempId = req.params.clientTempId;
  const { username, password } = req.body;
  console.log(
    `[ADMIN LOGIN ATTEMPT]: Temp ID: ${clientTempId} \n${username} : ${password}.`
  );

  try {
    // Verifica se as credenciais são válidas.
    if (checkCredentials(username, password)) {
      // Credenciais válidas. Checando se é um admin.
      const user = getUserDataByUserName(username) as AdminUser;
      if (user.role !== "admin") {
        throw UserIsNotAdminException;
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
      updateArcadeIdentifier(id, clientTempId);
    } else {
      // Se as credenciais não forem válidas, retorna erro.
    }
  } catch (error: any) {
    res.status(error.statusCode);
    res.json({
      type: "arcadeLoginError",
      content: error.message,
    });
  }
}

export function generateLoginPage(req: Request, res: Response) {
  const clientId = parseInt(req.params.clientId);
  console.log(`Gerando página de login para o cliente ${clientId}.`);
  res.send("Serviço descontinuado.");
  return;
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

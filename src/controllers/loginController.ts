import { Request, Response } from "express";
import {
  checkCredentials,
  getUserDataByUserName,
} from "../services/userService";
import { connectPlayer } from "../app";
import { clients, wss } from "../main";
import { getPlayerByUserId } from "../services/playerService";
import { LoginException } from "../exceptions/loginExceptions";
import AppError from "../exceptions/appError";

export function tryToLogin(req: Request, res: Response) {
  // Analisar credenciais recebidas
  const { username, password } = req.body;
  const clientId = parseInt(req.params.clientId);
  console.log(`[LOGIN ATTEMPT]: ID: ${clientId} - ${username} : ${password}.`);

  // Verificar se as credenciais são válidas
  if (checkCredentials(username, password)) {
    try {
      const _userId = getUserDataByUserName(username).id;
      // Verifica se já existe um player conectado.
      connectPlayer(_userId, clientId);
    } catch (error: any) {
      if (error instanceof AppError) {
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
    const playerData = getPlayerByUserId(getUserDataByUserName(username).id);
    res.json({
      type: "loginSuccess",
      content: playerData,
    });

    // Enviar mensagem para o Client Websocket desejado:
    clients.forEach((client) => {
      if (client.id === clientId) {
        client.ws.send(
          JSON.stringify({
            type: "playerJoined",
            content: playerData,
          })
        );
      }
    });

    // Atualizar array de players do cliente.
    clients.forEach((client) => {
      if (client.id === clientId) {
        client.players.push(playerData.userId);
      }
    });

    console.log("[LoginController] [tryToLogin] Login bem-sucedido.");
  } else {
    // Se as credenciais não forem válidas, retorna um erro.
    res.status(401);
    res.json({
      type: "loginFailed",
      content: "Credenciais inválidas.",
    });
    console.log("Login falhou.");
  }
}

import { Request, Response } from "express";
import { disconnectPlayer } from "../app";
import { wss } from "../main";
import { getUserDataByUserName } from "../services/userService";

export function logout(req: Request, res: Response) {
  const { username } = req.body;

  try {
    disconnectPlayer(username);
  } catch (error: any) {
    console.error(
      `[LOGOUT] Erro ao desconectar jogador ${username}: ${error.message}`
    );
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

  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: "playerLeft",
        content: {
          userId: getUserDataByUserName(username).id,
        },
      })
    );
  });

  console.log(`[LOGOUT] Jogador ${username} desconectado.`);
}

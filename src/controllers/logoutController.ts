import { Request, Response } from "express";
import { disconnectPlayer } from "../app";
import { wss } from "../main";
import { getUserDataByUserName } from "../services/userService";
import AppError from "../exceptions/appError";

export function logout(req: Request, res: Response) {
  const { username } = req.body;

  try {
    const userId = getUserDataByUserName(username).id;
    disconnectPlayer(userId);
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        type: "logoutError",
        content: error.message,
      });
      console.log(`[LogoutController] [logout] ${error.message}.`);
    }
    return;
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

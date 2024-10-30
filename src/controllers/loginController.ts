import { Request, Response } from "express";
import { checkCredentials } from "../services/userService";
import { connectPlayer } from "../app";

export function tryToLogin(req: Request, res: Response) {
  // Analisar credenciais recebidas
  const { username, password } = req.body;
  console.log(
    `Tentativa de login com credenciais: ${username} e senha ${password}.`
  );

  // Verificar se as credenciais são válidas
  if (checkCredentials(username, password)) {
    // Verifica se já existe um player conectado.
    if (connectPlayer(username)) {
      res.status(200);
      res.json({
        type: "loginSuccess",
        content: "Login bem-sucedido.",
      });
      console.log("Login bem-sucedido.");
    } else {
      res.status(403).json({
        type: "loginFailed",
        content:
          "Já existe um jogador conectado. Tente novamente mais tarde.",
      });
      console.log(
        `Tentativa de login rejeitada para ${username}. Já existe um jogador conectado.`
      );
    }
  } else {
    res.status(401);
    res.json({
      type: "loginFailed",
      content: "Credenciais inválidas.",
    });
    console.log("Login falhou.");
  }
}

import express, { Application } from "express";
import session from "express-session";
import cors from "cors";
import { playerRoutes } from "./routes/playerRoutes";
import { limiter } from "./middleware/rateLimit";
import { leaderboardRoutes } from "./routes/leaderboardRoutes";
import { scoreRoutes } from "./routes/scoreRoutes";
import { loginRoutes } from "./routes/loginRoutes";
import { logoutRoutes } from "./routes/logoutRoutes";
import { arcadeLoginRoutes } from "./routes/arcadeLoginRoutes";
import { clients } from "./main";
import { debugRoutes } from "./routes/debugRoutes";
import { isAlreadyConnected, isClientFull } from "./services/userService";
import {
  AlreadyConnectedException,
  ClientFullException,
  ClientNotFoundException,
  LoginException,
} from "./exceptions/loginExceptions";
import { clientExists } from "./services/clientService";

// Criar a instância do Express
const app: Application = express();

// Middleware de limitação de requisições
app.use(express.json());
app.use(cors());
// app.set("trust proxy", 1); // Ajuste o número conforme o número de proxies entre o usuário e o servidor
// app.use(limiter);

// Configurar rotas
app.use("/player", playerRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/score", scoreRoutes);
app.use("/login", loginRoutes);
app.use("/arcadeLogin", arcadeLoginRoutes);
app.use("/logout", logoutRoutes);
app.use("/debug", debugRoutes);

// TODO: Configurar sessões

// Função para conectar o jogador num fliperama específico
export function connectPlayer(userId: number, clientId: number): void {
  if (!clientExists(clientId)) {
    throw new ClientNotFoundException();
  }

  if (isAlreadyConnected(userId)) {
    throw new AlreadyConnectedException();
  }

  if (isClientFull(clientId)) {
    throw new ClientFullException();
  }
}

// Função para desconectar o jogador
export function disconnectPlayer(playerId: number): void {
  clients.forEach((client) => {
    // Remover o jogador da lista de players do cliente.
    console.log(client.players);
    if (client.players.includes(playerId)) {
      client.players.splice(client.players.indexOf(playerId), 1);
      console.log(
        `[DISCONNECT] Player ${playerId} disconnected from client ${client.id}.`
      );
    }
  });
}

export function getConnectedPlayerId(): string | null {
  return "a";
  //   return connectedPlayerId;
}

// Definir rota inicial:
app.get("/", (req, res) => {
  console.log("Rota inicial acessada");
  res.json({
    type: "connected",
    content: "Bem-vindo ao servidor.",
  });
});

export default app;

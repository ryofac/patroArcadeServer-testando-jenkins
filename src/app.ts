// Importações Principais
import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Importar exceções:
import {
  AlreadyConnectedException,
  ClientFullException,
  ClientNotFoundException,
} from "./exceptions/loginExceptions";

// Importar rotas:
import { playerRoutes } from "./routes/playerRoutes";
import { leaderboardRoutes } from "./routes/leaderboardRoutes";
import { scoreRoutes } from "./routes/scoreRoutes";
import { loginRoutes } from "./routes/loginRoutes";
import { logoutRoutes } from "./routes/logoutRoutes";
import { arcadeLoginRoutes } from "./routes/arcadeLoginRoutes";
import { newsRoutes } from "./routes/newsRoutes";
import { debugRoutes } from "./routes/debugRoutes";

// Importações que não deviam estar aqui:
import { clients } from "./main";
import { isAlreadyConnected, isClientFull } from "./services/userService";
import { clientExists } from "./services/clientService";
import { gameRoutes } from "./routes/gameRoutes";
import { saveRoutes } from "./routes/saveRoutes";

// Criar a instância do Express
const app: Application = express();

// Middleware de limitação de requisições
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Configurar rotas
app.use("/player", playerRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/score", scoreRoutes);
app.use("/login", loginRoutes);
app.use("/arcadeLogin", arcadeLoginRoutes);
app.use("/logout", logoutRoutes);
app.use("/latestNews", newsRoutes);
app.use("/game", gameRoutes);
app.use("/save", saveRoutes);

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

console.log("Mudando alguma coisa")
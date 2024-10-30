import express, { Application } from "express";
import session from "express-session";
import cors from "cors";
import { playerRoutes } from "./routes/playerRoutes";
import { limiter } from "./middleware/rateLimit";
import { leaderboardRoutes } from "./routes/leaderboardRoutes";
import { scoreRoutes } from "./routes/scoreRoutes";
import { loginRoutes } from "./routes/loginRoutes";
import { logoutRoutes } from "./routes/logoutRoutes";

// Criar a instância do Express
const app: Application = express();

// Middleware de limitação de requisições
app.use(express.json());
app.use(cors());
app.use(limiter);

// Configurar rotas
app.use("/player", playerRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/score", scoreRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);

// Configurar sessões
// app.use(session({
//     secret: 'patrocinioads2024',    // Uma string usada para assinar a sessão
//     resave: false,                  // Não salvar a sessão se nada mudou
//     saveUninitialized: true,        // Salvar sessões novas mesmo sem dados
//     cookie: { secure: false }       // 'secure' deve ser true se estiver usando HTTPS
// }));

let connectedPlayerId: string | null = null; // Para armazenar o ID do jogador conectado

// Função para conectar o jogador
export function connectPlayer(playerId: string): boolean {
  if (connectedPlayerId === null) {
    connectedPlayerId = playerId;
    console.log(`> CONNECTED: ${playerId}`);
    return true;
  }
  return false; // Se já houver um jogador conectado, não permite a conexão
}

// Função para desconectar o jogador
export function disconnectPlayer(playerId: string): void {
  if (connectedPlayerId === playerId) {
    console.log(`> DISCONNECTED: ${playerId}`);
    connectedPlayerId = null;
  } else {
    throw new Error("O jogador não está conectado.");
  }
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

import { Router } from "express";
import { getPlayerSaveData } from "../controllers/saveController";

// Criar uma instância do Router
const router = Router();

// Rota para obter dados de um jogador específico
router.get("/:playerId/:gameId", getPlayerSaveData);

// Exportar o router usando um alias
export { router as saveRoutes };

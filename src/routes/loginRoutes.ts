import { Router } from "express";
import { tryToLogin } from "../controllers/loginController";

// Criar uma instância do Router
const router = Router();

// Rota para obter dados de um jogador específico
router.post("/:clientId", tryToLogin);

// Exportar o router usando um alias
export { router as loginRoutes };

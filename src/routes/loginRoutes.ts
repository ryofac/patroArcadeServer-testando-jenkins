import { Router } from "express";
import { tryToLogin } from "../controllers/loginController";
import { generateLoginPage } from "../controllers/loginArcadeController";

// Criar uma instância do Router
const router = Router();

// Rota para obter dados de um jogador específico
router.post("/:clientId", tryToLogin);

// Página de Login
router.get("/:clientId", generateLoginPage);

// Exportar o router usando um alias
export { router as loginRoutes };
    
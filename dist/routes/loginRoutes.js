"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
// Criar uma instância do Router
const router = (0, express_1.Router)();
exports.loginRoutes = router;
// Rota para obter dados de um jogador específico
router.post("/:clientId", loginController_1.tryToLogin);

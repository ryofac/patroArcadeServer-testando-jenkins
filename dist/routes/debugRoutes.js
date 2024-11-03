"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugRoutes = void 0;
const express_1 = require("express");
const main_1 = require("../main");
function showClients(req, res) {
    console.log("Mostrando clientes conectados.");
    console.log(main_1.clients);
    res.json({
        type: "clients",
        content: main_1.clients,
    });
}
// Criar uma instância do Router
const router = (0, express_1.Router)();
exports.debugRoutes = router;
// Rota para obter dados de um jogador específico
router.get("/clients", showClients);

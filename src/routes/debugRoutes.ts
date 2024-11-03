import express, { Request, Response } from "express";
import { Router } from "express";
import { clients } from "../main";

function showClients(req: Request, res: Response) {
  console.log("Mostrando clientes conectados.");
  console.log(clients);

  res.json({
    type: "clients",
    content: clients,
  });
}

// Criar uma instância do Router
const router = Router();

// Rota para obter dados de um jogador específico
router.get("/clients", showClients);

// Exportar o router usando um alias
export { router as debugRoutes };

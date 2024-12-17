import { Request, Response } from "express";
import { findSaveData } from "../services/saveService";
import { saveDatabase } from "../models/saveData";

export function getPlayerSaveData(req: Request, res: Response) {
  console.log("Solicitando dados salvos...");
  console.log(req.body);

  const playerId = Number(req.params.playerId);
  const gameId = Number(req.params.gameId);

  // Consultar o banco de dados para obter os dados salvos do jogador
  try {
    const save = findSaveData(playerId, gameId);
    return res.status(200).json({ type: "playerSave", content: save });
  } catch (err) {
    console.error("Erro ao obter dados de save: ", (err as Error).message);
    return res.status(404).json({
      type: "playerSaveFailed",
      content: "Erro ao obter dados de save.",
    });
  } finally {
    console.log("Solicitação de dados de save finalizada.");
  }
}

export function getSaveDatas(req: Request, res: Response) {
  console.log("Obtendo todos os dados salvos.");

  const saves = saveDatabase;
  return res.status(200).json({ type: "allSaves", content: saves });
}

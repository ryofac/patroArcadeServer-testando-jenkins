import express, { Request, Response } from "express";
import {
  getPlayerByName,
  getLeaderboardData,
  generateNewPlayer,
  addPlayerToDatabase,
  getPlayerByUserId,
} from "../services/playerService";

// Obter dados de um jogador específico
export const getPlayerData = (req: Request, res: Response) => {
  const playerId = Number(req.params.playerUserId);
  const player = getPlayerByUserId(playerId);

  if (player) {
    console.log(`Fornecendo dados do jogador: ${player.name}`);
    res.status(200).json({
      type: "playerData",
      content: player,
    });
    return;
  }

  console.log(`Jogador não encontrado ID: ${playerId}`);
  res.status(404).json({
    type: "playerData",
    content: `Player ID ${playerId} not found`,
  });
};

// Obter leaderboard
export const getLeaderBoard = (req: Request, res: Response) => {
  const leaderboard = getLeaderboardData();
  res.json({
    type: "leaderboard",
    content: leaderboard,
  });
};

// Criar um novo jogador
export const createNewPlayer = (req: Request, res: Response) => {
  const playerName = req.body.name;
  console.log(playerName);

  const player = getPlayerByName(playerName);
  console.log(`Tentando criar o Player: ${playerName}`);

  if (player) {
    // Caso o jogador já exista, retornar um erro
    console.log("Jogador já existe");
    res.status(400).json({
      type: "error",
      content: `Player ${playerName} already exists`,
    });
  } else {
    // Caso o jogador não exista, criar um novo jogador.
    console.log("Criando como novo jogador");
    const newPlayer = generateNewPlayer(playerName, 1);
    // Adicionar o novo jogador ao banco de dados
    addPlayerToDatabase(newPlayer);

    res.json({
      type: "newPlayerData",
      content: newPlayer,
    });
  }
};

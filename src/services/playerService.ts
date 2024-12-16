// Serviços para Manipulação de Dados
import {
  PlayerHasNoSavesError,
  PlayerNotFoundError,
} from "../exceptions/appError";
import { Player, playerDatabase } from "../models/playerDatabase";
import { PlayerGameData, saveDatabase } from "../models/saveData";

// Retornar os dados de um jogaor específico
export const getPlayerByName = (name: string) => {
  return playerDatabase.find((player) => player.name === name);
};

// Retornar o Leaderboard
export const getLeaderboardData = () => {
  return playerDatabase
    .sort((a, b) => b.expPoints - a.expPoints)
    .map((player) => ({
      name: player.name,
      expPoints: player.expPoints,
      //   totalScore: player.totalScore,
      //   rankLevel: player.rankLevel,
    }));
};

// Gera um novo objeto de jogador
export function generateNewPlayer(playerName: string, userId: number): Player {
  const _newPlayer: Player = {
    name: playerName,
    level: 1,
    expPoints: 0,
    totalScore: 0,
    bio: "Novo Jogador",
    coins: 0,
    avatarIndex: 1,
    colorIndex: 1,
    userId: userId,
  };
  return _newPlayer;
}

// vou fazer silencio pq o rogerio eh chato com a gente

// Adiciona um jogador ao banco de dados
export function addPlayerToDatabase(playerData: Player): void {
  playerDatabase.push(playerData);
}

export function getPlayerByUserId(userId: number): Player {
  const player = playerDatabase.find((player) => player.userId === userId);
  if (!player) {
    throw new Error(`Player with userId ${userId} not found`);
  }
  return player;
}

export function obtainPlayerSaves(playerId: number): Array<PlayerGameData> {
  // Verifica se o jogador existe
  const player = playerDatabase.find((player) => player.userId === playerId);
  if (!player) {
    throw new PlayerNotFoundError();
  }

  const saves = saveDatabase.filter((save) => save.playerId === playerId);
  return saves;
}

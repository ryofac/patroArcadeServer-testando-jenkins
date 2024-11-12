import { Player, playerDatabase } from "../models/playerDatabase";

// Função para obter os dados de um jogador pelo nome
export function getPlayerDataByName(playerName: string): Player | undefined {
  return playerDatabase.find((player) => player.name === playerName);
}

// Função para obter os dados de um jogador pelo ID
export function getPlayerDataById(userId: number): Player | undefined {
  return playerDatabase.find((player) => player.userId === userId);
}

// Função para atualizar a pontuação de um jogador
export function updatePlayerScore(playerUserId: number, score: number) {
  const _player = getPlayerDataById(playerUserId);
  if (!_player) {
    console.log(`Jogador com ID ${playerUserId} não encontrado!`);
    return;
  }
  console.log(
    `Atualizando pontuação do jogador com ID: ${playerUserId} --- ${_player.name}`
  );
  if (_player) {
    _player.totalScore += score;
    _player.highestScore = Math.max(_player.highestScore, score);
    console.log("Pontuação atualizada!");
  }
}

// Função para atualizar os inimigos destruídos por um jogador
export function updatePlayerDefeatedEnemies(
  playerName: string,
  enemiesDestroyed: number
) {
  const _player = getPlayerDataByName(playerName);
  if (_player) {
    _player.enemiesDestroyed += enemiesDestroyed;
  }
}

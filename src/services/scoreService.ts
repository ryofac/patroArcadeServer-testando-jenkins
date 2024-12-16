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
export function updatePlayerScore(playerId: number, score: number) {
  const _player = getPlayerDataById(playerId);
  if (!_player) {
    console.log(`Jogador com ID ${playerId} não encontrado!`);
    return;
  }
  console.log(
    `Atualizando pontuação do jogador com ID: ${playerId} --- ${_player.name}`
  );
  if (_player) {
    _player.totalScore += score;
    console.log("Pontuação atualizada!");
  }
}

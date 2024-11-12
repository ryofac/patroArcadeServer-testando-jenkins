"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlayerDefeatedEnemies = exports.updatePlayerScore = exports.getPlayerDataById = exports.getPlayerDataByName = void 0;
const playerDatabase_1 = require("../models/playerDatabase");
// Função para obter os dados de um jogador pelo nome
function getPlayerDataByName(playerName) {
    return playerDatabase_1.playerDatabase.find((player) => player.name === playerName);
}
exports.getPlayerDataByName = getPlayerDataByName;
// Função para obter os dados de um jogador pelo ID
function getPlayerDataById(userId) {
    return playerDatabase_1.playerDatabase.find((player) => player.userId === userId);
}
exports.getPlayerDataById = getPlayerDataById;
// Função para atualizar a pontuação de um jogador
function updatePlayerScore(playerUserId, score) {
    const _player = getPlayerDataById(playerUserId);
    if (!_player) {
        console.log(`Jogador com ID ${playerUserId} não encontrado!`);
        return;
    }
    console.log(`Atualizando pontuação do jogador com ID: ${playerUserId} --- ${_player.name}`);
    if (_player) {
        _player.totalScore += score;
        _player.highestScore = Math.max(_player.highestScore, score);
        console.log("Pontuação atualizada!");
    }
}
exports.updatePlayerScore = updatePlayerScore;
// Função para atualizar os inimigos destruídos por um jogador
function updatePlayerDefeatedEnemies(playerName, enemiesDestroyed) {
    const _player = getPlayerDataByName(playerName);
    if (_player) {
        _player.enemiesDestroyed += enemiesDestroyed;
    }
}
exports.updatePlayerDefeatedEnemies = updatePlayerDefeatedEnemies;

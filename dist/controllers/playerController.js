"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlayersData = exports.getPlayerAllSaves = exports.createNewPlayer = exports.getLeaderBoard = exports.getPlayerData = void 0;
const playerService_1 = require("../services/playerService");
const appError_1 = __importDefault(require("../exceptions/appError"));
const playerDatabase_1 = require("../models/playerDatabase");
// Obter dados de um jogador específico
const getPlayerData = (req, res) => {
    console.log("getPlayerData acionado");
    const playerId = Number(req.params.playerId);
    const player = (0, playerService_1.getPlayerByUserId)(playerId);
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
exports.getPlayerData = getPlayerData;
/** Retrieves the leaderboard data and sends it as a JSON response.*/
const getLeaderBoard = (req, res) => {
    const leaderboard = (0, playerService_1.getLeaderboardData)();
    res.json({
        type: "leaderboard",
        content: leaderboard,
    });
};
exports.getLeaderBoard = getLeaderBoard;
// Criar um novo jogador
const createNewPlayer = (req, res) => {
    const playerName = req.body.name;
    console.log(playerName);
    const player = (0, playerService_1.getPlayerByName)(playerName);
    console.log(`Tentando criar o Player: ${playerName}`);
    if (player) {
        // Caso o jogador já exista, retornar um erro
        console.log("Jogador já existe");
        res.status(400).json({
            type: "error",
            content: `Player ${playerName} already exists`,
        });
    }
    else {
        // Caso o jogador não exista, criar um novo jogador.
        console.log("Criando como novo jogador");
        const newPlayer = (0, playerService_1.generateNewPlayer)(playerName, 1);
        // Adicionar o novo jogador ao banco de dados
        (0, playerService_1.addPlayerToDatabase)(newPlayer);
        res.json({
            type: "newPlayerData",
            content: newPlayer,
        });
    }
};
exports.createNewPlayer = createNewPlayer;
// Obter todos os saves de um jogador
const getPlayerAllSaves = (req, res) => {
    console.log("getPlayerAllSaves acionado");
    const playerId = Number(req.params.playerId);
    try {
        const saves = (0, playerService_1.obtainPlayerSaves)(playerId);
        console.log(`Fornecendo dados de save para o jogador ID: ${playerId}`);
        return res.status(200).json({ type: "playerSaves", content: saves });
    }
    catch (err) {
        console.error("Erro ao obter dados de save: ", err.message);
        if (err instanceof appError_1.default) {
            return res.status(err.statusCode).json({
                type: "playerSavesFailed",
                content: err.message,
            });
        }
    }
};
exports.getPlayerAllSaves = getPlayerAllSaves;
const getAllPlayersData = (req, res) => {
    console.log("Obtendo todos os dados de jogadores.");
    return res.status(200).json({ type: "allPlayers", content: playerDatabase_1.playerDatabase });
};
exports.getAllPlayersData = getAllPlayersData;

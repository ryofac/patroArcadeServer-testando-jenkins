"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaveDatas = exports.getPlayerSaveData = void 0;
const saveService_1 = require("../services/saveService");
const saveData_1 = require("../models/saveData");
function getPlayerSaveData(req, res) {
    console.log("Solicitando dados salvos...");
    console.log(req.body);
    const playerId = Number(req.params.playerId);
    const gameId = Number(req.params.gameId);
    // Consultar o banco de dados para obter os dados salvos do jogador
    try {
        const save = (0, saveService_1.findSaveData)(playerId, gameId);
        return res.status(200).json({ type: "playerSave", content: save });
    }
    catch (err) {
        console.error("Erro ao obter dados de save: ", err.message);
        return res.status(404).json({
            type: "playerSaveFailed",
            content: "Erro ao obter dados de save.",
        });
    }
    finally {
        console.log("Solicitação de dados de save finalizada.");
    }
}
exports.getPlayerSaveData = getPlayerSaveData;
function getSaveDatas(req, res) {
    console.log("Obtendo todos os dados salvos.");
    const saves = saveData_1.saveDatabase;
    return res.status(200).json({ type: "allSaves", content: saves });
}
exports.getSaveDatas = getSaveDatas;

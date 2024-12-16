"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitScore = void 0;
const scoreService_1 = require("../services/scoreService");
const playerService_1 = require("../services/playerService");
function submitScore(req, res) {
    console.log("Requisição de pontuação recebida.");
    console.log(req.body);
    const playerId = req.body.content.userId;
    const playerScore = req.body.content.score;
    // const playerEnemiesDestroyed = req.body.enemiesDestroyed;
    // Atualizar info do player.
    (0, scoreService_1.updatePlayerScore)(playerId, playerScore);
    res
        .json({
        type: "scoreReceived",
        content: "Score received.",
    })
        .status(200);
    console.log(`Pontuação recebida do Player ID: ${playerId} (${(0, playerService_1.getPlayerByUserId)(playerId).name}): ${playerScore}`);
}
exports.submitScore = submitScore;

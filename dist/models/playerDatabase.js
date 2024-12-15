"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerDatabase = void 0;
exports.playerDatabase = [
    {
        name: "Patrocinio",
        level: 1,
        expPoints: 0,
        bio: "Mestre do Universo",
        coins: 0,
        avatarIndex: 1,
        colorIndex: 1,
        userId: 1,
        saveDatas: [
            {
                gameId: 1,
                playerId: 1,
                lastPlayed: new Date("2024-12-15"),
                data: {
                    highestScore: 500,
                    totalScore: 1100,
                    asteroidsDestroyed: 13,
                    coinsCollected: 50,
                },
            },
            {
                gameId: 2,
                playerId: 1,
                lastPlayed: new Date("2024-12-14"),
                data: {
                    highestScore: 300,
                    totalScore: 800,
                    levelsCompleted: 5,
                    enemiesDefeated: 20,
                    coinsCollected: 100,
                },
            },
        ],
    },
];

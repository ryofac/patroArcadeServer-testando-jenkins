"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*

{
    racesWon: 50,
    totalPoints: 1100
}

h1 JOGO PATROCARS
{
    racesWon: "Corridas Vencidas",
    totalPoints: "Distancia maxima alcançada"

    Stats:
    Corridas Vencidas: 11,
    Vitórias: 5,
    Troféus Intergaláticos: 50,
    Pistas debloqueadas: 9

    Conquistas:
    ["run1000mAchievement", "unbeatableAchievement", ]

}

patro.saveDatas[0] =
{
    gameId: 1,
    playerId: 1,
    data: [
        {
            label: "Corridas Vencidas",
            value: 44
        },
        {
            label: "Asteroids Destruidos",
            value: 11
        },
        {
            label: "Pontuação Total",
            value: 3300
        }
    ]
}

patro.saveDatas[0] =
{
    gameId: 1,
    playerId: 1,
    data: [
        racesWon: 44,
        asteroidsDestroyed: 11,
        totalPoints: 3300
    ]
}

Ao exibir:
Jogos Jogados:
    • game.name:
        game.labels.get("racesWon"): 44
        game.labels.get("asteroidsDestroyed"): 11
        game.labels.get("totalPoints"): 3300



Criando a pagina:
Perfil de playerData.name:
playerData.bio
Patropontos: playerData.expPoints

Jogos Jogados:
for game in playerData.saveDatas:
    • Jogo <getGameNameById(game.gameId)
    for data in game.data:
        • data.label: data.value



Jogos Jogados:
    • PatroAsteroids:
        Corridas Vencidas: 44
        Asteroids Destruidos: 11
        Pontuação Total: 3300
*/

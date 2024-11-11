"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArcadeIdentifier = void 0;
const main_1 = require("../main");
function updateArcadeIdentifier(id, clientTempId) {
    const allClients = Array.from(main_1.clients.values());
    // Enviar mensagem para todos os websockets do mapa clients.
    for (const client of allClients) {
        client.ws.send(JSON.stringify({
            type: "arcadeId",
            content: {
                arcadeId: id,
                tempId: clientTempId,
            },
        }));
    }
}
exports.updateArcadeIdentifier = updateArcadeIdentifier;

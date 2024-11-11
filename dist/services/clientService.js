"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientById = exports.clientExists = void 0;
const main_1 = require("../main");
function clientExists(clientId) {
    console.log("Checando se existe o clientId: ", clientId);
    let _exists = false;
    for (const client of main_1.clients.values()) {
        if (client.id == clientId) {
            _exists = true;
            console.log("Cliente encontrado: ", client.id);
            return true;
        }
    }
    return _exists;
}
exports.clientExists = clientExists;
function getClientById(clientId) {
    for (const client of main_1.clients.values()) {
        if (client.id == clientId) {
            return client;
        }
    }
    return null;
}
exports.getClientById = getClientById;

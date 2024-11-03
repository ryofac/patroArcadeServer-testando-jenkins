"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientExists = void 0;
const main_1 = require("../main");
function clientExists(clientId) {
    let _exists = false;
    main_1.clients.forEach((client) => {
        if (client.id === clientId) {
            _exists = true;
        }
    });
    return _exists;
}
exports.clientExists = clientExists;

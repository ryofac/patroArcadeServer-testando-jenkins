"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientExists = void 0;
const main_1 = require("../main");
function clientExists(clientId) {
    return main_1.clients.has(clientId);
    //   let _exists = false;
    //   clients.forEach((client) => {
    //     if (client.id === clientId) {
    //       _exists = true;
    //     }
    //   });
    //   return _exists;
}
exports.clientExists = clientExists;

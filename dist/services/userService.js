"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClientFull = exports.isAlreadyConnected = exports.getUserDataByUserName = exports.checkCredentials = void 0;
const main_1 = require("../main");
const usersDatabase_1 = require("../models/usersDatabase");
// Função que verifica se as credenciais são válidas
function checkCredentials(username, password) {
    const user = usersDatabase_1.usersDatabase.find((u) => u.username === username && u.password === password);
    return !!user; // Retorna true se o usuário for encontrado, false caso contrário
}
exports.checkCredentials = checkCredentials;
function getUserDataByUserName(username) {
    const user = usersDatabase_1.usersDatabase.find((u) => u.username === username);
    if (!user) {
        throw new Error(`User with username ${username} not found`);
    }
    return user;
}
exports.getUserDataByUserName = getUserDataByUserName;
function isAlreadyConnected(userId) {
    let _connected = false;
    // Percorre todos os clientes
    main_1.clients.forEach((client) => {
        // Confere se há um player com o mesmo id do userId
        if (client.players.includes(userId)) {
            _connected = true;
        }
    });
    return _connected;
}
exports.isAlreadyConnected = isAlreadyConnected;
function isClientFull(clientId) {
    // Percorre todas as chaves do mapa clients, conferindo se o valor de id é igual ao clientId:
    for (let [key, value] of main_1.clients) {
        if (value.id === clientId) {
            // Se o número de players for maior ou igual a 2, retorna true
            return value.players.length >= 2;
        }
    }
    // Se não encontrar a chave, retorna false
    return false;
}
exports.isClientFull = isClientFull;

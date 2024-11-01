"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDataByUserName = exports.checkCredentials = void 0;
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

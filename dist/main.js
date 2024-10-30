"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
/**
 * The port number on which the server will listen for incoming connections.
 * @constant {number}
 */
const PORT = 3001;
app_1.default.listen(PORT, () => {
    console.clear();
    console.log(`PatroTCC rodando: ${PORT}`);
});

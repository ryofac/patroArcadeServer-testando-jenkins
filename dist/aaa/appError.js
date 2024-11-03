"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message = "An application error occurred", statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name; // Automatiza o nome da exceção
    }
}
exports.default = AppError;

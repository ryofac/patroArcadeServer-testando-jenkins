"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// exceptions/AppError.ts
class AppError extends Error {
    constructor(message = "An application error occurred", statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, AppError.prototype); // Corrige a cadeia de protótipos
    }
}
exports.default = AppError;

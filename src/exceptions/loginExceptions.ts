// exceptions/LoginException.js
import AppError from "./appError";

class LoginException extends AppError {
  constructor(message = "A login error occurred", statusCode = 500) {
    super(message, statusCode);
  }
}

/**
 * Exceção para quando o jogador já está conectado em um fliperama
 */
class AlreadyConnectedException extends LoginException {
  constructor() {
    super("User is already connected", 403);
  }
}

/**
 * Exceção para quando o fliperama já está com a quantidade máxima de jogadores conectados
 */
class ClientFullException extends LoginException {
  constructor() {
    super("Client is full", 409);
  }
}

class ClientNotFoundException extends LoginException {
  constructor() {
    super("Client not found", 404);
  }
}

export {
  LoginException,
  AlreadyConnectedException,
  ClientFullException,
  ClientNotFoundException,
};

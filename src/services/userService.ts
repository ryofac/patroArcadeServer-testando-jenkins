import { ClientNotFoundException } from "../exceptions/loginExceptions";
import { clients } from "../main";
import { usersDatabase } from "../models/usersDatabase";

// Função que verifica se as credenciais são válidas
export function checkCredentials(username: string, password: string): boolean {
  const user = usersDatabase.find(
    (u) => u.username === username && u.password === password
  );
  return !!user; // Retorna true se o usuário for encontrado, false caso contrário
}

export function getUserDataByUserName(username: string) {
  const user = usersDatabase.find((u) => u.username === username);
  if (!user) {
    throw new Error(`User with username ${username} not found`);
  }
  return user;
}

export function isAlreadyConnected(userId: number): boolean {
  let _connected = false;
  // Percorre todos os clientes
  clients.forEach((client) => {
    // Confere se há um player com o mesmo id do userId
    if (client.players.includes(userId)) {
      _connected = true;
    }
  });
  return _connected;
}

export function isClientFull(clientId: number): boolean {
  // Percorre todas as chaves do mapa clients, conferindo se o valor de id é igual ao clientId:
  var _client = clients.get(clientId);
  if (!_client) {
    throw new ClientNotFoundException();
  }

  return _client.players.length >= 2;
}

import { clients } from "../main";

export function clientExists(clientId: number): boolean {
  console.log("Checando se existe o clientId: ", clientId);
  let _exists = false;
  for (const client of clients.values()) {
    if (client.id == clientId) {
      _exists = true;
      console.log("Cliente encontrado: ", client.id);
      return true;
    }
  }
  return _exists;
}

export function getClientById(clientId: number) {
  for (const client of clients.values()) {
    if (client.id == clientId) {
      return client;
    }
  }
  return null;
}

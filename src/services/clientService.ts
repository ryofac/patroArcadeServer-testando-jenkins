import { clients } from "../main";

export function clientExists(clientId: number) {
  let _exists = false;
  clients.forEach((client) => {
    if (client.id === clientId) {
      _exists = true;
    }
  });
  return _exists;
}

import { clients } from "../main";

export function clientExists(clientId: number) {
  return clients.has(clientId);
  //   let _exists = false;
  //   clients.forEach((client) => {
  //     if (client.id === clientId) {
  //       _exists = true;
  //     }
  //   });
  //   return _exists;
}

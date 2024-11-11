import { clients } from "../main";

export function updateArcadeIdentifier(id: number, clientTempId: string): void {
  const allClients = Array.from(clients.values());

  // Enviar mensagem para todos os websockets do mapa clients.
  for (const client of allClients) {
    client.ws.send(
      JSON.stringify({
        type: "arcadeId",
        content: {
          arcadeId: id,
          tempId: clientTempId,
        },
      })
    );
  }
}

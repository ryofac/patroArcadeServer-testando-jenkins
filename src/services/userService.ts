import { usersDatabase } from "../models/usersDatabase";

// Função que verifica se as credenciais são válidas
export function checkCredentials(username: string, password: string): boolean {
  const user = usersDatabase.find(
    (u) => u.username === username && u.password === password
  );
  return !!user; // Retorna true se o usuário for encontrado, false caso contrário
}


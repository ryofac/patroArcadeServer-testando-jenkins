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

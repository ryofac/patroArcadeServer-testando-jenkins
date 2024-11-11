export interface GameInfo {
  id: number;
  name: string;
  description: string;
  genre: string;
  platform: string;
  developer: string;
  tags: string[];
}

const kingsAndPigs: GameInfo = {
  id: 1,
  name: "Kings and Pigs",
  description: "Primeiro jogo de testes",
  genre: "Ação",
  platform: "PatroArcade",
  developer: "PatroGames",
  tags: ["Action", "Two-Players", "Pigs"],
};

export const gameDatabase: GameInfo[] = [kingsAndPigs];

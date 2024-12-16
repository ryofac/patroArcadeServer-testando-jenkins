import { PlayerGameData } from "./saveData";
export interface Player {
  name: string;
  level: number;
  expPoints: number;
  totalScore: number;
  bio: string;
  coins: number;
  avatarIndex: number;
  colorIndex: number;
  userId: number;
}

export const playerDatabase: Player[] = [
  {
    name: "Patrocinio",
    level: 1,
    expPoints: 0,
    totalScore: 0,
    bio: "Mestre do Universo",
    coins: 0,
    avatarIndex: 1,
    colorIndex: 1,
    userId: 1,
  },
];

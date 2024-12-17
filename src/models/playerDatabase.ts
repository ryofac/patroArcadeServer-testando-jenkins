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
  {
    name: "Mickey",
    level: 2,
    expPoints: 150,
    totalScore: 300,
    bio: "O rato mais famoso do mundo",
    coins: 50,
    avatarIndex: 2,
    colorIndex: 2,
    userId: 2,
  },
  {
    name: "Donald",
    level: 3,
    expPoints: 300,
    totalScore: 600,
    bio: "O pato mais engraçado",
    coins: 100,
    avatarIndex: 3,
    colorIndex: 3,
    userId: 3,
  },
  {
    name: "Bob Esponja",
    level: 4,
    expPoints: 450,
    totalScore: 900,
    bio: "O melhor amigo do Patrick",
    coins: 150,
    avatarIndex: 4,
    colorIndex: 4,
    userId: 4,
  },
  {
    name: "Scooby-Doo",
    level: 5,
    expPoints: 600,
    totalScore: 1200,
    bio: "O cachorro detetive",
    coins: 200,
    avatarIndex: 5,
    colorIndex: 5,
    userId: 5,
  },
  {
    name: "Tom",
    level: 6,
    expPoints: 750,
    totalScore: 1500,
    bio: "O gato que sempre persegue o Jerry",
    coins: 250,
    avatarIndex: 6,
    colorIndex: 6,
    userId: 6,
  },
];

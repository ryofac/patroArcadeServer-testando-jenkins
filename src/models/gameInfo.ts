export interface GameInfo {
  id: number;
  name: string;
  description: string;
  genre: string;
  tags: string[];
}

export const gameDatabase: GameInfo[] = [
  {
    id: 1,
    name: "PatroAsteroids",
    description: "A thrilling space shooter game where you destroy asteroids.",
    genre: "Arcade",
    tags: ["space", "shooter", "arcade"],
  },
  {
    id: 2,
    name: "PatroArcade",
    description: "A platform with retro games for you to enjoy.",
    genre: "Arcade",
    tags: ["retro", "arcade"],
  },
  {
    id: 3,
    name: "PatroTetris",
    description: "A classic puzzle game that challenges your skills.",
    genre: "Puzzle",
    tags: ["puzzle", "classic"],
  },
];

export interface GameInfo {
  id: number;
  title: string;
  description: string;
  genre: string;
  tags: string[];
}

export const gameDatabase: GameInfo[] = [
  {
    id: 1,
    title: "PatroAsteroids",
    description: "A thrilling space shooter game where you destroy asteroids.",
    genre: "Arcade",
    tags: ["space", "shooter", "arcade"],
  },
  {
    id: 2,
    title: "PatroArcade",
    description: "A platform with retro games for you to enjoy.",
    genre: "Arcade",
    tags: ["retro", "arcade"],
  },
  {
    id: 3,
    title: "PatroTetris",
    description: "A classic puzzle game that challenges your skills.",
    genre: "Puzzle",
    tags: ["puzzle", "classic"],
  },
];

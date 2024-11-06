export interface GameInfo {
    id: number;
    name: string;
    description: string;
    price: number;
    version: string;
    releaseYear: number;
    genre: string;
    platform: string;
    score: number;
    publisher: string;
    developer: string;
    tags: string[];
    players: number;
    isOnline: boolean;
    imageUrl: string;
    videoUrl: string;
}
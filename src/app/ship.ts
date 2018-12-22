export enum Drive {
    Combustion = 1,
    Impulse = 2,
    Hyperspace = 3
}
export class Ship {
  name: string;
  speed1: number;
  speed2: number;
  engine: Drive;
  capacity: number;
}

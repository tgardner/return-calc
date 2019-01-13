import { Drive } from './drive.enum';

export class Ship {
  name: string;
  speed1: number;
  speed2: number;
  engine: Drive;
  capacity: number;
  selected: boolean = false;
}
export const SHIPS: Ship[] = [
  {
    name: "Small Cargo",
    speed1: 5000,
    speed2: 10000,
    engine: Drive.Combustion,
    capacity: 5000,
    selected: false
  },
  {
    name: "Large Cargo",
    speed1: 7500,
    speed2: 0,
    engine: Drive.Combustion,
    capacity: 25000,
    selected: false
  },
  {
    name: "Light Fighter",
    speed1: 12500,
    speed2: 0,
    engine: Drive.Combustion,
    capacity: 50,
    selected: false
  },
  {
    name: "Heavy Fighter",
    speed1: 10000,
    speed2: 0,
    engine: Drive.Impulse,
    capacity: 100,
    selected: false
  },
  {
    name: "Cruiser",
    speed1: 15000,
    speed2: 0,
    engine: Drive.Impulse,
    capacity: 800,
    selected: false
  },
  {
    name: "Battleship",
    speed1: 10000,
    speed2: 0,
    engine: Drive.Hyperspace,
    capacity: 1500,
    selected: false
  },
  {
    name: "Colony Ship",
    speed1: 2500,
    speed2: 0,
    engine: Drive.Impulse,
    capacity: 7500,
    selected: false
  },
  {
    name: "Recycler",
    speed1: 2000,
    speed2: 0,
    engine: Drive.Combustion,
    capacity: 20000,
    selected: false
  },
  {
    name: "Espionage Probe",
    speed1: 100000000,
    speed2: 0,
    engine: Drive.Combustion,
    capacity: 0,
    selected: false
  },
  {
    name: "Bomber",
    speed1: 4000,
    speed2: 5000,
    engine: Drive.Impulse,
    capacity: 500,
    selected: false
  },
  {
    name: "Destroyer",
    speed1: 5000,
    speed2: 0,
    engine: Drive.Hyperspace,
    capacity: 2000,
    selected: false
  },
  {
    name: "Deathstar",
    speed1: 100,
    speed2: 0,
    engine: Drive.Hyperspace,
    capacity: 1000000,
    selected: false
  },
  {
    name: "Battlecruiser",
    speed1: 10000,
    speed2: 0,
    engine: Drive.Hyperspace,
    capacity: 750,
    selected: false
  }
];

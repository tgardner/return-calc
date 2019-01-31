import { Drive } from './drive.enum';

export interface IShipCost {
  metal: number;
  crystal: number;
  deuterium: number;
}

export class Ship implements IShipCost {
  public name: string;
  public speed1: number;
  public speed2: number;
  public engine: Drive;
  public capacity: number;
  public selected: boolean = false;
  public metal: number = 0;
  public crystal: number = 0;
  public deuterium: number = 0;
}
export const SHIPS: Ship[] = [
  {
    name: "Small Cargo",
    speed1: 5000,
    speed2: 10000,
    engine: Drive.Combustion,
    capacity: 5000,
    selected: false,
    metal: 2000,
    crystal: 2000,
    deuterium: 0
  },
  {
    name: "Large Cargo",
    speed1: 7500,
    speed2: 0,
    engine: Drive.Combustion,
    capacity: 25000,
    selected: false,
    metal: 6000,
    crystal: 6000,
    deuterium: 0
  },
  {
    name: "Light Fighter",
    speed1: 12500,
    speed2: 0,
    engine: Drive.Combustion,
    capacity: 50,
    selected: false,
    metal: 3000,
    crystal: 1000,
    deuterium: 0
  },
  {
    name: "Heavy Fighter",
    speed1: 10000,
    speed2: 0,
    engine: Drive.Impulse,
    capacity: 100,
    selected: false,
    metal: 6000,
    crystal: 4000,
    deuterium: 0
  },
  {
    name: "Cruiser",
    speed1: 15000,
    speed2: 0,
    engine: Drive.Impulse,
    capacity: 800,
    selected: false,
    metal: 20000,
    crystal: 7000,
    deuterium: 2000
  },
  {
    name: "Battleship",
    speed1: 10000,
    speed2: 0,
    engine: Drive.Hyperspace,
    capacity: 1500,
    selected: false,
    metal: 45000,
    crystal: 15000,
    deuterium: 0
  },
  {
    name: "Colony Ship",
    speed1: 2500,
    speed2: 0,
    engine: Drive.Impulse,
    capacity: 7500,
    selected: false,
    metal: 10000,
    crystal: 20000,
    deuterium: 10000
  },
  {
    name: "Recycler",
    speed1: 2000,
    speed2: 0,
    engine: Drive.Combustion,
    capacity: 20000,
    selected: false,
    metal: 10000,
    crystal: 6000,
    deuterium: 2000
  },
  {
    name: "Espionage Probe",
    speed1: 100000000,
    speed2: 0,
    engine: Drive.Combustion,
    capacity: 0,
    selected: false,
    metal: 0,
    crystal: 1000,
    deuterium: 0
  },
  {
    name: "Bomber",
    speed1: 4000,
    speed2: 5000,
    engine: Drive.Impulse,
    capacity: 500,
    selected: false,
    metal: 50000,
    crystal: 25000,
    deuterium: 15000
  },
  {
    name: "Destroyer",
    speed1: 5000,
    speed2: 0,
    engine: Drive.Hyperspace,
    capacity: 2000,
    selected: false,
    metal: 60000,
    crystal: 50000,
    deuterium: 15000
  },
  {
    name: "Deathstar",
    speed1: 100,
    speed2: 0,
    engine: Drive.Hyperspace,
    capacity: 1000000,
    selected: false,
    metal: 5000000,
    crystal: 4000000,
    deuterium: 1000000
  },
  {
    name: "Battlecruiser",
    speed1: 10000,
    speed2: 0,
    engine: Drive.Hyperspace,
    capacity: 750,
    selected: false,
    metal: 30000,
    crystal: 40000,
    deuterium: 15000
  }
];

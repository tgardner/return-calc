import { Drive } from './drive.enum';

const bonusMap = new Map<Drive, number>([
  [Drive.Combustion, .1],
  [Drive.Impulse, .2],
  [Drive.Hyperspace, .3]
]);

export interface IShipCost {
  metal: number;
  crystal: number;
  deuterium: number;
}

export interface IShip extends IShipCost {
  name: string;
  speed: Map<Drive, number>;
  engine: Drive;
  capacity: number;
}

export class Ship implements IShip {
  public static readonly SmallCargo = "Small Cargo";
  public static readonly LargeCargo = "Large Cargo";
  public static readonly LightFighter = "Light Fighter";
  public static readonly HeavyFighter = "Heavy Fighter";
  public static readonly Cruiser = "Cruiser";
  public static readonly Battleship = "Battleship";
  public static readonly ColonyShip = "Colony Ship";
  public static readonly Recycler = "Recycler";
  public static readonly EspionageProbe = "Espionage Probe";
  public static readonly Bomber = "Bomber";
  public static readonly Destroyer = "Destroyer";
  public static readonly Deathstar = "Deathstar";
  public static readonly Battlecruiser = "Battlecruiser";

  public constructor(ship: IShip) {
    Object.keys(ship).forEach((key) => this[key] = ship[key]);
  }

  public readonly name: string;
  public readonly speed: Map<Drive, number>;
  public readonly engine: Drive;
  public readonly capacity: number;
  public readonly metal: number = 0;
  public readonly crystal: number = 0;
  public readonly deuterium: number = 0;
  public selected: boolean = false;

  public getSpeed(combustion: number, impulse: number, hyperspace: number, admiral: number = 0): number {
    const levelMap = new Map<Drive, number>([
      [Drive.Combustion, combustion],
      [Drive.Impulse, impulse],
      [Drive.Hyperspace, hyperspace],
    ]);

    var engine = this.engine;

    // Engine Upgrades
    if (this.name === Ship.SmallCargo && impulse >= 5) {
      engine = Drive.Impulse;
    } else if (this.name === Ship.Bomber && hyperspace >= 8) {
      engine = Drive.Hyperspace;
    } else if (this.name === Ship.Recycler && hyperspace >= 15) {
      engine = Drive.Hyperspace;
    } else if (this.name === Ship.Recycler && impulse >= 17) {
      engine = Drive.Impulse;
    }

    var speed = this.speed.get(engine);
    var level = levelMap.get(engine);
    var bonus = bonusMap.get(engine);
    return speed * (1 + (level * bonus)) + (speed * admiral);
  }
}

export const SHIPS: Ship[] = [
  new Ship({
    name: Ship.SmallCargo,
    speed: new Map([
      [Drive.Combustion, 5000],
      [Drive.Impulse, 10000]
    ]),
    engine: Drive.Combustion,
    capacity: 5000,
    metal: 2000,
    crystal: 2000,
    deuterium: 0
  }),
  new Ship({
    name: Ship.LargeCargo,
    speed: new Map([
      [Drive.Combustion, 7500]
    ]),
    engine: Drive.Combustion,
    capacity: 25000,
    metal: 6000,
    crystal: 6000,
    deuterium: 0
  }),
  new Ship({
    name: Ship.LightFighter,
    speed: new Map([
      [Drive.Combustion, 12500]
    ]),
    engine: Drive.Combustion,
    capacity: 50,
    metal: 3000,
    crystal: 1000,
    deuterium: 0
  }),
  new Ship({
    name: Ship.HeavyFighter,
    speed: new Map([
      [Drive.Impulse, 10000]
    ]),
    engine: Drive.Impulse,
    capacity: 100,
    metal: 6000,
    crystal: 4000,
    deuterium: 0
  }),
  new Ship({
    name: Ship.Cruiser,
    speed: new Map([
      [Drive.Impulse, 15000]
    ]),
    engine: Drive.Impulse,
    capacity: 800,
    metal: 20000,
    crystal: 7000,
    deuterium: 2000
  }),
  new Ship({
    name: Ship.Battleship,
    speed: new Map([
      [Drive.Hyperspace, 10000]
    ]),
    engine: Drive.Hyperspace,
    capacity: 1500,
    metal: 45000,
    crystal: 15000,
    deuterium: 0
  }),
  new Ship({
    name: Ship.ColonyShip,
    speed: new Map([
      [Drive.Impulse, 2500]
    ]),
    engine: Drive.Impulse,
    capacity: 7500,
    metal: 10000,
    crystal: 20000,
    deuterium: 10000
  }),
  new Ship({
    name: Ship.Recycler,
    speed: new Map([
      [Drive.Combustion, 2000],
      [Drive.Impulse, 2000],
      [Drive.Hyperspace, 2000],
    ]),
    engine: Drive.Combustion,
    capacity: 20000,
    metal: 10000,
    crystal: 6000,
    deuterium: 2000
  }),
  new Ship({
    name: Ship.EspionageProbe,
    speed: new Map([
      [Drive.Combustion, 100000000]
    ]),
    engine: Drive.Combustion,
    capacity: 0,
    metal: 0,
    crystal: 1000,
    deuterium: 0
  }),
  new Ship({
    name: Ship.Bomber,
    speed: new Map([
      [Drive.Impulse, 4000],
      [Drive.Hyperspace, 5000],
    ]),
    engine: Drive.Impulse,
    capacity: 500,
    metal: 50000,
    crystal: 25000,
    deuterium: 15000
  }),
  new Ship({
    name: Ship.Destroyer,
    speed: new Map([
      [Drive.Hyperspace, 5000],
    ]),
    engine: Drive.Hyperspace,
    capacity: 2000,
    metal: 60000,
    crystal: 50000,
    deuterium: 15000
  }),
  new Ship({
    name: Ship.Deathstar,
    speed: new Map([
      [Drive.Hyperspace, 100],
    ]),
    engine: Drive.Hyperspace,
    capacity: 1000000,
    metal: 5000000,
    crystal: 4000000,
    deuterium: 1000000
  }),
  new Ship({
    name: Ship.Battlecruiser,
    speed: new Map([
      [Drive.Hyperspace, 10000],
    ]),
    engine: Drive.Hyperspace,
    capacity: 750,
    metal: 30000,
    crystal: 40000,
    deuterium: 15000
  })
];

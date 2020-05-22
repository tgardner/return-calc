export interface ICost {
  metal: number;
  crystal: number;
  deuterium: number;
}

enum Drive {
  Combustion = 1,
  Impulse = 2,
  Hyperspace = 3
}

export interface IShip extends ICost {
  name: string;
  engines: EngineCollection;
  capacity: number;
}

interface IEngine {
  drive: Drive,
  speed: number,
  fuel: number
}

class EngineCollection {
  private readonly map: Map<Drive, IEngine>;

  public constructor(
    public defaultEngine: Drive,
    entries?: readonly IEngine[]) {
    this.map = new Map<Drive, IEngine>();
    if (entries) {
      entries.forEach(e => this.map.set(e.drive, e));
    }
  }

  public get(index: Drive): IEngine {
    var engine = this.map.get(index);
    return engine;
  }
}

const bonusMap = new Map<Drive, number>([
  [Drive.Combustion, .1],
  [Drive.Impulse, .2],
  [Drive.Hyperspace, .3]
]);

class Ship implements IShip {
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

  public constructor(ship: Partial<IShip>) {
    Object.assign(this, ship);
  }

  public readonly engines: EngineCollection;
  public readonly name: string;
  public readonly capacity: number;
  public readonly metal: number = 0;
  public readonly crystal: number = 0;
  public readonly deuterium: number = 0;
  public selected: boolean = false;

  public getEngine(combustion: number, impulse: number, hyperspace: number): IEngine {
    var engine = this.engines.defaultEngine;

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

    return this.engines.get(engine);
  }

  public getSpeed(combustion: number, impulse: number, hyperspace: number, admiral: number = 0): number {
    const levelMap = new Map<Drive, number>([
      [Drive.Combustion, combustion],
      [Drive.Impulse, impulse],
      [Drive.Hyperspace, hyperspace],
    ]);

    var engine = this.getEngine(combustion, impulse, hyperspace);
    var speed = this.engines.get(engine.drive).speed;
    var level = levelMap.get(engine.drive);
    var bonus = bonusMap.get(engine.drive);
    return speed * (1 + (level * bonus)) + (speed * admiral);
  }
}

export const SHIPS: Ship[] = [
  new Ship({
    name: Ship.SmallCargo,
    engines: new EngineCollection(Drive.Combustion, [
      { drive: Drive.Combustion, speed: 5000, fuel: 10 },
      { drive: Drive.Impulse, speed: 10000, fuel: 20 }
    ]),
    capacity: 5000,
    metal: 2000,
    crystal: 2000,
    deuterium: 0
  }),
  new Ship({
    name: Ship.LargeCargo,
    engines: new EngineCollection(Drive.Combustion, [
      { drive: Drive.Combustion, speed: 7500, fuel: 50 }
    ]),
    capacity: 25000,
    metal: 6000,
    crystal: 6000,
    deuterium: 0
  }),
  new Ship({
    name: Ship.LightFighter,
    engines: new EngineCollection(Drive.Combustion, [
      { drive: Drive.Combustion, speed: 12500, fuel: 20 }
    ]),
    capacity: 50,
    metal: 3000,
    crystal: 1000,
    deuterium: 0
  }),
  new Ship({
    name: Ship.HeavyFighter,
    engines: new EngineCollection(Drive.Impulse, [
      { drive: Drive.Impulse, speed: 10000, fuel: 75 }
    ]),
    capacity: 100,
    metal: 6000,
    crystal: 4000,
    deuterium: 0
  }),
  new Ship({
    name: Ship.Cruiser,
    engines: new EngineCollection(Drive.Impulse, [
      { drive: Drive.Impulse, speed: 15000, fuel: 300 }
    ]),
    capacity: 800,
    metal: 20000,
    crystal: 7000,
    deuterium: 2000
  }),
  new Ship({
    name: Ship.Battleship,
    engines: new EngineCollection(Drive.Hyperspace, [
      { drive: Drive.Hyperspace, speed: 10000, fuel: 500 }
    ]),
    capacity: 1500,
    metal: 45000,
    crystal: 15000,
    deuterium: 0
  }),
  new Ship({
    name: Ship.ColonyShip,
    engines: new EngineCollection(Drive.Impulse, [
      { drive: Drive.Impulse, speed: 2500, fuel: 1000 }
    ]),
    capacity: 7500,
    metal: 10000,
    crystal: 20000,
    deuterium: 10000
  }),
  new Ship({
    name: Ship.Recycler,
    engines: new EngineCollection(Drive.Combustion, [
      { drive: Drive.Combustion, speed: 2000, fuel: 300 },
      { drive: Drive.Impulse, speed: 4000, fuel: 600 },
      { drive: Drive.Hyperspace, speed: 6000, fuel: 900 }
    ]),
    capacity: 20000,
    metal: 10000,
    crystal: 6000,
    deuterium: 2000
  }),
  new Ship({
    name: Ship.EspionageProbe,
    engines: new EngineCollection(Drive.Combustion, [
      { drive: Drive.Combustion, speed: 100000000, fuel: 1 }
    ]),
    capacity: 0,
    metal: 0,
    crystal: 1000,
    deuterium: 0
  }),
  new Ship({
    name: Ship.Bomber,
    engines: new EngineCollection(Drive.Impulse, [
      { drive: Drive.Impulse, speed: 4000, fuel: 700 },
      { drive: Drive.Hyperspace, speed: 5000, fuel: 1000 }
    ]),
    capacity: 500,
    metal: 50000,
    crystal: 25000,
    deuterium: 15000
  }),
  new Ship({
    name: Ship.Destroyer,
    engines: new EngineCollection(Drive.Hyperspace, [
      { drive: Drive.Hyperspace, speed: 5000, fuel: 1000 }
    ]),
    capacity: 2000,
    metal: 60000,
    crystal: 50000,
    deuterium: 15000
  }),
  new Ship({
    name: Ship.Deathstar,
    engines: new EngineCollection(Drive.Hyperspace, [
      { drive: Drive.Hyperspace, speed: 100, fuel: 1 }
    ]),
    capacity: 1000000,
    metal: 5000000,
    crystal: 4000000,
    deuterium: 1000000
  }),
  new Ship({
    name: Ship.Battlecruiser,
    engines: new EngineCollection(Drive.Hyperspace, [
      { drive: Drive.Hyperspace, speed: 10000, fuel: 250 }
    ]),
    capacity: 750,
    metal: 30000,
    crystal: 40000,
    deuterium: 15000
  })
];

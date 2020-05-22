export interface ILocation {
  galaxy: number;
  system: number;
  planet: number;
  player?: string;
}

export abstract class StorageService {
  protected data: ILocation[] = [];
  protected systemPlanets = 15;

  constructor() { }

  abstract load(): Promise<ILocation[]>;

  system(galaxy: number, system: number): ILocation[] {
    const result: ILocation[] = new Array(this.systemPlanets);

    const data = this.data.filter(l => l.galaxy === galaxy && l.system === system);

    for (let i = 0; i < data.length; ++i) {
      const location = data[i];
      result[location.planet - 1] = location;
    }

    return result;
  }

  search(searchTerm: string): ILocation[] {
    const result = this.data.filter(l =>
      l.player && l.player.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);

    result.sort(function (a, b) {
      if (a.player !== b.player) {
        return a.player < b.player ? -1 : 1;
      }
      if (a.galaxy !== b.galaxy) {
        return a.galaxy - b.galaxy;
      }
      if (a.system !== b.system) {
        return a.system - b.system;
      }
      if (a.planet !== b.planet) {
        return a.planet - b.planet;
      }
      return 0;
    });

    return result;
  }
}

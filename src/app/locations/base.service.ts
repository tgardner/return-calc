import { ILocation } from './ilocation';

interface LocationService {
  load(): Promise<ILocation[]>
  system(galaxy: number, system: number): string[];
  search(searchTerm: string): ILocation[];
}

export class BaseService implements LocationService {
  protected data: ILocation[] = [];
  protected systemPlanets = 15;

  constructor() { }

  load(): Promise<ILocation[]> {
    throw new Error("Method not implemented.");
  }

  system(galaxy: number, system: number): string[] {
    let result: string[] = new Array(this.systemPlanets);

    var data = this.data.filter(l => l.galaxy == galaxy && l.system == system);

    for (var i = 0; i < data.length; ++i) {
      var location = data[i];
      result[location.planet - 1] = location.player;
    }

    return result;
  }

  search(searchTerm: string): ILocation[] {
    var result = this.data.filter(l =>
      l.player && l.player.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);

    result.sort(function (a, b) {
      if (a.player !== b.player)
        return a.player < b.player ? -1 : 1;
      if (a.galaxy !== b.galaxy)
        return a.galaxy - b.galaxy;
      if (a.system !== b.system)
        return a.system - b.system;
      if (a.planet !== b.planet)
        return a.planet - b.planet;
      return 0;
    });

    return result;
  }
}

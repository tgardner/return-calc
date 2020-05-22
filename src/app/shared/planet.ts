interface IPlanet {
  galaxy: number,
  system: number,
  planet: number,
}

export class Planet implements IPlanet {
  constructor()
  constructor(coordinates: string)
  constructor(planet: IPlanet)
  constructor(galaxy: number, system: number, planet: number)
  constructor(galaxy?: any, system?: number, planet?: number){
    if(typeof galaxy === "object") {
      Object.assign(this, galaxy);
    } else if(typeof galaxy === "string") {
      this.fromString(galaxy);
    } else {
      this.galaxy = galaxy || 1;
      this.system = system || 1;
      this.planet = planet || 1;
    }
  }

  public galaxy: number;
  public system: number;
  public planet: number;

  public toString() : string {
    return `${this.galaxy}:${this.system}:${this.planet}`;
  }

  public fromString(planet: string) {
    var match = planet.match(/^(\d+):(\d+):(\d+)/);
    if(!match) return;
    this.galaxy = parseInt(match[1]);
    this.system = parseInt(match[2]);
    this.planet = parseInt(match[3]);
  }

  public static sort(a: Planet, b: Planet) : number {
    if(a.galaxy !== b.galaxy)
      return a.galaxy < b.galaxy ? -1 : 1;
    if(a.system !== b.system)
      return a.system < b.system ? -1 : 1;
    if(a.planet !== b.planet)
      return a.planet < b.planet ? -1 : 1;
    return 0;
  }
};

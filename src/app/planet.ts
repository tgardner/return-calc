export class Planet {
  constructor(
    public galaxy: number,
    public system: number,
    public planet: number,
  ){}

  public toString() : string {
    return this.galaxy.toString() + ":" + this.system.toString() + ":" + this.planet.toString();
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

export class Calculator {
  constructor(
    public start: Planet,
    public end: Planet
  ){}

  speed: number = 1;
  modifier: number = 3;
  initial: string = null;
  combustion: number;
  impulse: number;
  hyperspace: number;

  calculateDistance(): number {
    if(this.start.galaxy === this.end.galaxy &&
      this.start.system === this.end.system &&
      this.start.planet === this.end.planet) {
      return 5;
    }

    var gal = 20000 * Math.abs(this.start.galaxy - this.end.galaxy);
    var sys = 2700 + 95 * Math.abs(this.start.galaxy - this.end.galaxy);
    var plan = 1000 + 5 * Math.abs(this.start.galaxy - this.end.galaxy);

    return gal + sys + plan;
  }
};

export class Planet {
  constructor(
    public galaxy: number,
    public system: number,
    public planet: number,
  ){}
};

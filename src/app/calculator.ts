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

  calculateFlightTime(v: number): number {
    var d = this.calculateDistance();
    var s = this.speed;
    var a = this.modifier;
    return Math.round((10 + (3500 / s) * Math.sqrt((10 * d) / v)) / a);
  }
};

export class Planet {
  constructor(
    public galaxy: number,
    public system: number,
    public planet: number,
  ){}
};

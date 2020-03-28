import { SHIPS } from './ship';
import { Planet } from './planet';

export interface ICalculator {
  start: Planet,
  end: Planet,
  speed: number;
  modifier: number;
  combustion: number;
  impulse: number;
  hyperspace: number;
  admiral: number;
}

export class Calculator implements ICalculator {
  constructor(readonly init?:Partial<ICalculator>) {
    Object.assign(this, init);
  }

  public start: Planet;
  public end: Planet;
  public speed: number = 1;
  public modifier: number = 3;
  public combustion: number;
  public impulse: number;
  public hyperspace: number;
  public admiral: number = 0;
  public ships = SHIPS;

  public clone(): Calculator {
    var copy = new Calculator(this);
    copy.start = new Planet(this.start);
    copy.end = new Planet(this.end);
    return copy;
  }

  public calculateFlightTime(): number {
    var d = this.calculateDistance();
    var s = this.speed;
    var a = this.modifier;
    var v = this.calculateSpeed();
    if(v === Infinity) return NaN;

    return Math.round((10 + (3500 / s) * Math.sqrt((10 * d) / v)) / a);
  }

  private calculateDistance(): number {
    if (this.start.galaxy === this.end.galaxy &&
      this.start.system === this.end.system &&
      this.start.planet === this.end.planet) {
      return 5;
    }

    var gal = 20000 * Math.abs(this.start.galaxy - this.end.galaxy);
    if (this.start.galaxy !== this.end.galaxy) return gal;
    var sys = 2700 + 95 * Math.abs(this.start.system - this.end.system);
    if (this.start.system !== this.end.system) return sys;
    var plan = 1000 + 5 * Math.abs(this.start.planet - this.end.planet);

    return plan;
  }

  private calculateSpeed(): number {
    var speeds = SHIPS
      .filter(s => s.selected)
      .map(s => s.getSpeed(this.combustion, this.impulse, this.hyperspace, this.admiral));
    return Math.min.apply(null, speeds);
  }
};

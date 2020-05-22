import { SHIPS } from '../shared/ship';
import { Planet } from '../shared/planet';

export interface ICalculator {
  start: Planet;
  end: Planet;
  speed: number;
  modifier: number;
  combustion: number;
  impulse: number;
  hyperspace: number;
  admiral: number;
}

export class Calculator implements ICalculator {
  constructor(readonly init?: Partial<ICalculator>) {
    Object.assign(this, init);
  }

  public start: Planet;
  public end: Planet;
  public speed = 1;
  public modifier = 3;
  public combustion: number;
  public impulse: number;
  public hyperspace: number;
  public admiral = 0;
  public ships = SHIPS;

  public clone(): Calculator {
    const copy = new Calculator(this);
    copy.start = new Planet(this.start);
    copy.end = new Planet(this.end);
    return copy;
  }

  public calculateFlightTime(): number {
    const d = this.calculateDistance();
    const s = this.speed;
    const a = this.modifier;
    const v = this.calculateSpeed();
    if (v === Infinity) { return NaN; }

    return Math.round((10 + (3500 / s) * Math.sqrt((10 * d) / v)) / a);
  }

  private calculateDistance(): number {
    if (this.start.galaxy === this.end.galaxy &&
      this.start.system === this.end.system &&
      this.start.planet === this.end.planet) {
      return 5;
    }

    const gal = 20000 * Math.abs(this.start.galaxy - this.end.galaxy);
    if (this.start.galaxy !== this.end.galaxy) { return gal; }
    const sys = 2700 + 95 * Math.abs(this.start.system - this.end.system);
    if (this.start.system !== this.end.system) { return sys; }
    const plan = 1000 + 5 * Math.abs(this.start.planet - this.end.planet);

    return plan;
  }

  private calculateSpeed(): number {
    const speeds = SHIPS
      .filter(s => s.selected)
      .map(s => s.getSpeed(this.combustion, this.impulse, this.hyperspace, this.admiral));
    return Math.min.apply(null, speeds);
  }
}

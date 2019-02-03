import { Drive } from './drive.enum';
import { Ship, SHIPS } from './ship';
import { Planet } from './planet';

export class Calculator {
  constructor(
    public start: Planet,
    public end: Planet
  ){}

  public speed: number = 1;
  public modifier: number = 3;
  public combustion: number;
  public impulse: number;
  public hyperspace: number;
  public ships: Ship[] = SHIPS;
  public admiral: number = 0;

  public calculateFlightTime(): number {
    var d = this.calculateDistance();
    var s = this.speed;
    var a = this.modifier;
    var v = this.calculateSpeed();
    return Math.round((10 + (3500 / s) * Math.sqrt((10 * d) / v)) / a);
  }

  private calculateDistance(): number {
    if(this.start.galaxy === this.end.galaxy &&
      this.start.system === this.end.system &&
      this.start.planet === this.end.planet) {
      return 5;
    }

    var gal = 20000 * Math.abs(this.start.galaxy - this.end.galaxy);
    if(this.start.galaxy !== this.end.galaxy) return gal;
    var sys = 2700 + 95 * Math.abs(this.start.system - this.end.system);
    if(this.start.system !== this.end.system) return sys;
    var plan = 1000 + 5 * Math.abs(this.start.planet - this.end.planet);

    return plan;
  }

  private calculateSpeed(): number {
    var result = 0;
    for(var i = 0; i< this.ships.length; ++i) {
      var ship = this.ships[i];

      if(!ship.selected) continue;

      var speed = ship.speed1;
      var level, bonus;

      switch(ship.engine) {
        case Drive.Combustion:
          level = this.combustion;
          bonus = .1;
          break;
        case Drive.Impulse:
          level = this.impulse;
          bonus = .2;
          break;
        case Drive.Hyperspace:
          level = this.hyperspace;
          bonus = .3;
          break;
      }

      if(ship.name === "Small Cargo" && this.impulse >= 5) {
        speed = ship.speed2;
        level = this.impulse;
        bonus = .2;
      } else if(ship.name === "Bomber" && this.hyperspace >= 8) {
        speed = ship.speed2;
        level = this.hyperspace;
        bonus = .3;
      }
      
      speed = speed * (1 + (level * bonus)) + (speed * this.admiral);

      if(!result || result > speed) result = speed;
    }

    return result;
  }
};

import { Injectable } from '@angular/core';
import { Calculator } from './calculator';
import { Planet } from '../shared/planet';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  public model = new Calculator({
    start: new Planet(1, 1, 1),
    end: new Planet(1, 1, 2),
    combustion: 18,
    impulse: 15,
    hyperspace: 14
  });

  constructor() {

  }

  public load(params: Params) {
    if (Object.keys(params).length === 0) {
      return;
    }

    for (const i in params) {
      if (!params.hasOwnProperty(i)) {
        continue;
      }

      switch (i) {
        case 'start':
        case 'end':
          this.model[i] = new Planet(params[i]);
          break;
        case 'ships':
          this.model.ships
            .filter(ship => params[i].indexOf(ship.name) >= 0)
            .forEach(s => s.selected = true);
          break;
        default:
          if (this.model.hasOwnProperty(i)) {
            this.model[i] = parseFloat(params[i]);
          }
          break;
      }
    }
  }

  public save() {
    return {
      start: this.model.start.toString(),
      end: this.model.end.toString(),
      speed: this.model.speed,
      modifier: this.model.modifier,
      combustion: this.model.combustion,
      impulse: this.model.impulse,
      hyperspace: this.model.hyperspace,
      admiral: this.model.admiral,
      ships: this.model.ships.filter(s => s.selected).map(s => s.name)
    };
  }
}

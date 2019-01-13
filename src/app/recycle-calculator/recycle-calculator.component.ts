import { Component } from '@angular/core';
import { Calculator } from '../calculator';
import { interval } from 'rxjs';

const timeInterval = interval(50);

class SlotValue {
  constructor(public flightTime: number) {
    this.remaining = flightTime;
  }

  public remaining: number;
  public endTime: Date;
}

@Component({
  selector: 'app-recycle-calculator',
  templateUrl: './recycle-calculator.component.html',
  styleUrls: ['./recycle-calculator.component.scss']
})
export class RecycleCalculatorComponent {

  // planet number, flight time
  private planets: Map<number, SlotValue> = new Map<number, SlotValue>();
  private calculator: Calculator;
  private show: boolean = false;
  private started: boolean = false;
  private timer: any;

  constructor() {
    for(var i = 1; i <= 15; ++i) {
      this.planets.set(i, null);
    }
  }

  public calculate(calculator: Calculator): void {
    var copy: Calculator = JSON.parse(JSON.stringify(calculator)) as Calculator;
    Object.setPrototypeOf(copy, Calculator.prototype);
    this.calculator = copy;
    this.reset();
  }

  private reset(): void {
    var flightTime = this.calculator.calculateFlightTime();

    if(isNaN(flightTime) || flightTime === Infinity) {
      this.show = false;
      return;
    }
    this.show = true;

    for(var i = 1; i <= 15; ++i) {
      this.calculator.end.planet = i;
      this.planets.set(i, new SlotValue(this.calculator.calculateFlightTime()));
    }
  }

  public start(): void {
    this.started = true;

    for(var i = 1; i <= 15; ++i) {
      var planet = this.planets.get(i);
      planet.endTime = new Date();
      planet.endTime.setTime(planet.endTime.getTime() + planet.remaining * 1000);
    }
    this.timer = timeInterval.subscribe(() => {
      this.tick();
    });
  }

  public stop(): void {
    if(this.timer) {
      this.timer.unsubscribe();
      this.timer = null;
    }
    this.started = false;
    this.reset();
  }

  private tick(): void {
    var now = new Date();
    var stop = true;
    for(var i = 1; i <= 15; ++i) {
      var planet = this.planets.get(i);
      if(planet.endTime < now) {
        planet.remaining = 0;
        continue;
      }
      stop = false;
      planet.remaining = (+planet.endTime - +now) / 1000;
    }
    if(stop) {
      this.stop();
    }
  }
}

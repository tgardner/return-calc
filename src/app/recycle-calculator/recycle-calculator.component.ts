import { Component } from '@angular/core';
import { Calculator } from '../calculator';
import { interval } from 'rxjs';

const timeInterval = interval(50);

class SlotValue {
  constructor(public planet: number, public flightTime: number) {
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
  public planets: SlotValue[] = [];
  public show: boolean = false;
  public started: boolean = false;
  public selected: SlotValue;
  private calculator: Calculator;
  private timer: any;

  constructor() {
  }

  public calculate(calculator: Calculator): void {
    var copy: Calculator = JSON.parse(JSON.stringify(calculator)) as Calculator;
    Object.setPrototypeOf(copy, Calculator.prototype);
    this.calculator = copy;
    this.reset();
  }

  private reset(): void {
    this.selected = null;
    var flightTime = this.calculator.calculateFlightTime();

    if(isNaN(flightTime) || flightTime === Infinity) {
      this.show = false;
      return;
    }
    this.show = true;

    this.planets = [];
    for(var i = 0; i < 15; ++i) {
      this.calculator.end.planet = i + 1;
      this.planets.push(new SlotValue(i + 1, this.calculator.calculateFlightTime()));
    }
  }

  public start(): void {
    this.started = true;

    for(var i = 0; i < 15; ++i) {
      var planet = this.planets[i];
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
    for(var i = 0; i < 15; ++i) {
      var planet = this.planets[i];
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

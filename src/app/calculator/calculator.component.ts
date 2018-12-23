import { Component, OnInit } from '@angular/core';
import { TimeFormatPipe } from '../pipes/time.pipe';
import { Calculator, Planet } from '../calculator';
import { Ship, Drive, SHIPS } from '../ship';

@Component({
  selector: 'app-planet',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})

export class CalculatorComponent implements OnInit {
  model: Calculator;
  modifiers: number[] = [1,2,3,4,5];

  speeds: number[] = [.1,.2,.3,.4,.5,.6,.7,.8,.9,1];

  flightTime: number;
  remaining: number = 0;

  started: boolean = false;
  recalled: boolean = false;

  ships: Ship[] = SHIPS;
  private timer: any;

  constructor() {
    var calculator = new Calculator(new Planet(1,1,1), new Planet(1,1,1));

    // Just populate the initial model with some values
    calculator.combustion = 15;
    calculator.impulse = 12;
    calculator.hyperspace = 10;

    this.model = calculator;
  }

  ngOnInit() {
    this.refresh();
  }

  refresh(): void {
    this.flightTime = this.model.calculateFlightTime(this.calculateSpeed());
    if(isNaN(this.flightTime) || this.flightTime === Infinity) {
      this.model.initial = null;
      return;
    }

    var formatter = new TimeFormatPipe();
    var result = formatter.transform(this.flightTime);

    this.model.initial = result;
  }

  start(): void {
    if(this.timer) this.stopTimer();

    var hms = this.model.initial;   // your input string
    var a = hms.split(':'); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    var endTime = new Date();
    endTime.setTime(endTime.getTime() + seconds * 1000);
    this.startTimer(endTime);
    this.started = true;
  }

  recall(): void {
    this.stopTimer();
    this.recalled = true;
    this.started = true;
    var endTime = new Date();
    endTime.setTime(endTime.getTime() + (this.flightTime - this.remaining) * 1000);
    this.startTimer(endTime);
  }

  stop(): void {
    this.stopTimer();
    this.remaining = 0;
  }

  private startTimer(endTime): void {
    this.timer = setInterval(() => {
      var now = new Date();
      if(endTime < now) {
        if(!this.recalled) {
          this.recall();
        } else {
          this.stop();
        }
        return;
      }

      var remaining = (endTime - now);
      this.remaining = Math.round(remaining / 1000);
    }, 50);
  }

  private stopTimer(): void {
    clearInterval(this.timer);
    this.timer = null;
    this.started = false;
    this.recalled = false;
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
          level = this.model.combustion;
          bonus = .1;
          break;
        case Drive.Impulse:
          level = this.model.impulse;
          bonus = .2;
          break;
        case Drive.Hyperspace:
          level = this.model.hyperspace;
          bonus = .3;
          break;
      }

      if(ship.name === "Small Cargo" && this.model.impulse >= 5) {
        speed = ship.speed2;
        level = this.model.impulse;
        bonus = .2;
      } else if(ship.name === "Bomber" && this.model.hyperspace >= 8) {
        speed = ship.speed2;
        level = this.model.hyperspace;
        bonus = .3;
      }

      speed = speed * (1 + (level * bonus));
      if(!result || result > speed) result = speed;
    }

    return result;
  }
}

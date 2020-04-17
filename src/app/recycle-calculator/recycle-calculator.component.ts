import { Component } from '@angular/core';
import { Calculator } from '../calculator';
import { interval, Subscription } from 'rxjs';
import { Flight } from '../flight';

const timeInterval = interval(100);

@Component({
  selector: 'app-recycle-calculator',
  templateUrl: './recycle-calculator.component.html',
  styleUrls: ['./recycle-calculator.component.scss']
})
export class RecycleCalculatorComponent {
  public flights: Flight[];
  public show: boolean = false;
  public started: boolean = false;
  public selected?: number = null;
  private calculator: Calculator;
  private timer : Subscription;

  constructor() {
  }

  public calculate(calculator: Calculator): void {
    this.calculator = calculator.clone();

    this.reset();

    var flightTime = this.calculator.calculateFlightTime();

    if (isNaN(flightTime) || flightTime === Infinity) {
      this.show = false;
      return;
    }

    this.show = true;
    this.flights = [];
    for (var i = 1; i <= 15; ++i) {
      this.calculator.end.planet = i;
      var flight = new Flight(this.calculator.calculateFlightTime());
      this.flights.push(flight);
    }
  }

  private reset(): void {
    if (this.timer) {
      this.timer.unsubscribe();
      this.timer = null;
    }
    this.started = false;
    this.selected = null;
  }

  public start(): void {
    this.started = true;

    this.flights.forEach(f => f.start());

    this.timer = timeInterval.subscribe(() => {
      this.tick();
    });
  }

  public stop(): void {
    this.reset();
    this.flights.forEach(f => f.stop());
  }

  private tick(): void {
    var remaining = this.flights.filter(f => f.remaining > 0);
    if (remaining.length === 0) {
      this.stop();
    }
  }
}

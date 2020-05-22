import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Flight } from '../../flight';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TimePipe } from 'src/app/calculator/pipes/time.pipe';
import { BaseCalculator } from '../../base-calculator';
import { CalculatorService } from '../../calculator.service';

const timeInterval = interval(100);
const maxPlanets = 15;

@Component({
  selector: 'app-recycle-calculator',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.scss']
})
export class RecycleComponent extends BaseCalculator {
  public flights: Flight[];
  public show = false;
  public startTime: Date;
  public selected?: number = null;
  private timer: Subscription;

  constructor(
    public time: TimePipe,
    calculator: CalculatorService,
    router: Router,
    route: ActivatedRoute) {
    super(calculator, route, router);
  }

  protected load(params: Params) {
    super.load(params);

    const flightTime = this.calculator.model.calculateFlightTime();
    if (isNaN(flightTime) || flightTime === Infinity) {
      this.show = false;
      return;
    }

    this.show = true;

    const calc = this.calculator.model.clone();
    this.flights = new Array(maxPlanets);
    for (let i = 0; i < maxPlanets; ++i) {
      calc.end.planet = i + 1;
      const duration = calc.calculateFlightTime();
      this.flights[i] = new Flight(duration);
    }

    if (params.startTime) {
      this.startTime = new Date(params.startTime);
      this.flights.forEach(f => {
        const r = f.duration - (+new Date() - +this.startTime) / 1000;
        f.start(r);
      });
      this.timer = timeInterval.subscribe(() => this.tick());
    }
  }

  protected state(): any {
    const state = super.state();
    state.startTime = this.startTime?.toISOString() || '';
    return state;
  }

  private reset(): void {
    if (this.timer) {
      this.timer.unsubscribe();
      this.timer = null;
    }
    this.startTime = null;
    this.selected = null;
  }

  public start(): void {
    this.startTime = new Date();
    this.navigate();
  }

  public stop(): void {
    this.reset();
    this.navigate();
  }

  private tick(): void {
    const remaining = this.flights.filter(f => f.remaining > 0);
    if (remaining.length === 0) {
      this.stop();
    }
  }
}

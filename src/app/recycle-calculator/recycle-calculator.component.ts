import { Component } from '@angular/core';
import { Calculator } from '../calculator';
import { interval, Subscription } from 'rxjs';
import { Flight } from '../flight';
import { Router, ActivatedRoute } from '@angular/router';

const timeInterval = interval(100);
const maxPlanets = 15;

@Component({
  selector: 'app-recycle-calculator',
  templateUrl: './recycle-calculator.component.html',
  styleUrls: ['./recycle-calculator.component.scss']
})
export class RecycleCalculatorComponent {
  public flights: Flight[];
  public show: boolean = false;
  public startTime: Date;
  public selected?: number = null;
  private calculator: Calculator;
  private timer: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
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
    this.flights = new Array(maxPlanets);
    for (var i = 0; i < maxPlanets; ++i) {
      this.calculator.end.planet = i + 1;
      var duration = this.calculator.calculateFlightTime();
      this.flights[i] = new Flight(duration);
    }

    var params = this.route.snapshot.queryParams;
    if (params["startTime"]) {
      this.startTime = new Date(params["startTime"]);
      this.flights.forEach(f => {
        var r = f.duration - (+new Date() - +this.startTime) / 1000;
        f.start(r);
      })
      this.timer = timeInterval.subscribe(() => this.tick());
    }
  }

  private navigate() {
    var data = {
      startTime: this.startTime?.toISOString() || ""
    };

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: data,
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
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
    var remaining = this.flights.filter(f => f.remaining > 0);
    if (remaining.length === 0) {
      this.stop();
    }
  }
}

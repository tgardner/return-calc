import { Component } from '@angular/core';
import { Calculator } from '../calculator';
import { TimePipe } from '../time.pipe';
import { interval, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Flight } from '../flight';

const timeInterval = interval(100);

@Component({
  selector: 'app-deploy-calculator',
  templateUrl: './deploy-calculator.component.html',
  styleUrls: ['./deploy-calculator.component.scss']
})
export class DeployCalculatorComponent {
  private timer: Subscription;
  public started: boolean = false;
  public recalled: boolean = false;
  public flight: Flight;
  public initial: string;

  constructor(
    private timePipe: TimePipe,
    private router: Router,
    private route: ActivatedRoute) { }

  public calculate(calculator: Calculator): void {
    var flightTime = calculator.calculateFlightTime();
    if (isNaN(flightTime) || flightTime === Infinity) {
      this.initial = null;
      return;
    }

    this.flight = new Flight(flightTime);
    this.initial = this.timePipe.transform(flightTime);
    var params = this.route.snapshot.queryParams;
    if (params["arrivalTime"])
      this.flight.endTime = new Date(params["arrivalTime"]);

    this.started = params["started"] == "true";
    this.recalled = params["recalled"] == "true";

    if (this.timer) {
      this.timer.unsubscribe();
      this.timer = null;
    }

    if (this.started) {
      this.timer = timeInterval.subscribe(() => {
        this.tick();
      });
    }
  }

  private navigate() {
    var data = {
      arrivalTime: this.flight?.endTime?.toISOString() || "",
      started: this.started,
      recalled: this.recalled
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

  public start(): void {
    var a = this.initial.split(':'); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    this.flight.start(seconds);
    this.started = true;
    this.navigate();
  }

  public recall(): void {
    this.recalled = true;
    this.flight.recall();
    this.navigate();
  }

  public stop(): void {
    this.started = false;
    this.recalled = false;
    this.flight.stop();
    this.navigate();
  }

  private tick(): void {
    if (this.flight.remaining <= 0) {
      this.stop();
    }
  }
}

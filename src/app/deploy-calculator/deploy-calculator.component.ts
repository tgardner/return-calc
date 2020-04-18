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

    this.initial = this.timePipe.transform(flightTime);

    var params = this.route.snapshot.queryParams;
    this.flight = new Flight(flightTime);
    if (params["startTime"])
      this.flight.startTime = new Date(params["startTime"]);

    if (params["recallTime"])
      this.flight.recallTime = new Date(params["recallTime"]);

    if (this.timer) {
      this.timer.unsubscribe();
      this.timer = null;
    }

    if (this.flight.startTime) {
      this.timer = timeInterval.subscribe(() => this.tick());
    }
  }

  private navigate() {
    var data = {
      startTime: this.flight?.startTime?.toISOString() || "",
      recallTime: this.flight?.recallTime?.toISOString() || ""
    };

    var initial = this.initial;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: data,
        queryParamsHandling: 'merge',
        replaceUrl: true
      }).then(() => {
        // Restore any overridden initial time
        this.initial = initial;
      });
  }

  public start(): void {
    this.flight.start(this.initialSeconds());
    this.navigate();
  }

  public recall(): void {
    this.flight.recall();
    this.navigate();
  }

  public stop(): void {
    this.flight.stop();
    this.navigate();
  }

  private tick(): void {
    if (this.flight.remaining <= 0) {
      this.stop();
    }
  }

  private initialSeconds(): number {
    var a = this.initial.split(':'); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
  }
}

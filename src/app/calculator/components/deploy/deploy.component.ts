import { Component } from '@angular/core';
import { TimePipe } from '../../../shared/time.pipe';
import { interval, Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Flight } from '../../../shared/flight';
import { BaseCalculator } from '../../base-calculator';
import { CalculatorService } from '../../calculator.service';

const timeInterval = interval(100);

@Component({
  selector: 'app-deploy-calculator',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss']
})
export class DeployComponent extends BaseCalculator {
  private timer: Subscription;
  public flight: Flight;
  public initial: string;

  constructor(
    public time: TimePipe,
    router: Router,
    route: ActivatedRoute,
    calculator: CalculatorService) {
    super(calculator, route, router);
  }

  protected load(params: Params) {
    super.load(params);

    var flightTime = this.calculator.model.calculateFlightTime();
    if (isNaN(flightTime) || flightTime === Infinity) {
      this.initial = null;
      return;
    }
    
    this.initial = this.time.transform(flightTime);
    this.flight = new Flight(flightTime);
    if (params.startTime) {
      this.flight.startTime = new Date(params.startTime);
    }

    if(params.recallTime) {
      this.flight.recallTime = new Date(params.recallTime);
    }
    
    if (this.timer) {
      this.timer.unsubscribe();
      this.timer = null;
    }

    if (this.flight.startTime) {
      this.timer = timeInterval.subscribe(() => this.tick());
    }
  }

  protected state() {
    var state = super.state();
    state.startTime = this.flight?.startTime?.toISOString() || "";
    state.recallTime = this.flight?.recallTime?.toISOString() || "";
    return state;
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

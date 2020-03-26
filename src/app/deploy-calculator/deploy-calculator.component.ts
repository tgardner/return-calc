import { Component } from '@angular/core';
import { Calculator } from '../calculator';
import { TimePipe } from '../time.pipe';
import { interval } from 'rxjs';

const timeInterval = interval(50);

@Component({
  selector: 'app-deploy-calculator',
  templateUrl: './deploy-calculator.component.html',
  styleUrls: ['./deploy-calculator.component.scss']
})
export class DeployCalculatorComponent {
  private timer: any;
  public started: boolean = false;
  public recalled: boolean = false;
  public arrivalTime: Date;
  public remaining: number = 0;
  public initial: string;
  public flightTime: number;

  constructor(private timePipe: TimePipe) { }

  public calculate(calculator: Calculator): void {
    this.flightTime = calculator.calculateFlightTime();
    if (isNaN(this.flightTime) || this.flightTime === Infinity) {
      this.initial = null;
      return;
    }

    var result = this.timePipe.transform(this.flightTime);
    this.initial = result;
  }

  public start(): void {
    if (this.timer) this.timer.unsubscribe();

    var a = this.initial.split(':'); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    var endTime = new Date();
    endTime.setTime(endTime.getTime() + seconds * 1000);
    this.arrivalTime = endTime;

    this.timer = timeInterval.subscribe(() => {
      this.tick();
    });
    this.started = true;
  }

  public recall(): void {
    this.recalled = true;

    var endTime = new Date();
    endTime.setTime(endTime.getTime() + (this.flightTime - this.remaining) * 1000);
    this.arrivalTime = endTime;
  }

  public stop(): void {
    if (this.timer) {
      this.timer.unsubscribe();
      this.timer = null;
    }

    this.started = false;
    this.recalled = false;
    this.remaining = 0;
  }

  private tick(): void {
    var now: Date = new Date();
    if (this.arrivalTime < now) {
      if (!this.recalled) {
        this.recall();
      } else {
        this.stop();
      }
      return;
    }

    var remaining = (+this.arrivalTime - +now);
    this.remaining = remaining / 1000;
  }
}

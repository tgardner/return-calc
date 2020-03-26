import { Component, OnInit } from '@angular/core';
import { Calculator } from '../calculator';
import { TimePipe } from '../time.pipe';
import { interval } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

const timeInterval = interval(50);

@Component({
  selector: 'app-deploy-calculator',
  templateUrl: './deploy-calculator.component.html',
  styleUrls: ['./deploy-calculator.component.scss']
})
export class DeployCalculatorComponent implements OnInit {
  private timer: any;
  public started: boolean = false;
  public recalled: boolean = false;
  public arrivalTime: Date;
  public remaining: number = 0;
  public initial: string;
  public flightTime: number;

  constructor(
    private timePipe: TimePipe,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params["arrivalTime"])
        this.arrivalTime = new Date(params["arrivalTime"]);

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
    });
  }

  public calculate(calculator: Calculator): void {
    this.flightTime = calculator.calculateFlightTime();
    if (isNaN(this.flightTime) || this.flightTime === Infinity) {
      this.initial = null;
      return;
    }

    var result = this.timePipe.transform(this.flightTime);
    this.initial = result;
  }

  private navigate() {
    var data = {
      arrivalTime: !this.arrivalTime ? "" : this.arrivalTime.toISOString(),
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

    var endTime = new Date();
    endTime.setTime(endTime.getTime() + seconds * 1000);
    this.arrivalTime = endTime;
    this.started = true;
    this.navigate();
  }

  public recall(): void {
    this.recalled = true;

    var endTime = new Date();
    endTime.setTime(endTime.getTime() + (this.flightTime - this.remaining) * 1000);
    this.arrivalTime = endTime;

    this.navigate();
  }

  public stop(): void {
    this.started = false;
    this.recalled = false;
    this.remaining = 0;
    this.arrivalTime = null;
    this.navigate();
  }

  private tick(): void {
    var now: Date = new Date();
    if (this.arrivalTime < now) {
      this.stop();
      return;
    }

    var remaining = (+this.arrivalTime - +now);
    this.remaining = remaining / 1000;
  }
}

import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TimePipe } from '../time.pipe';
import { interval } from 'rxjs';

const timeInterval = interval(50);

@Component({
  selector: 'app-deploy-calculator',
  templateUrl: './deploy-calculator.component.html',
  styleUrls: ['./deploy-calculator.component.scss']
})
export class DeployCalculatorComponent implements OnInit {
  @Input() flightTime: number;

  private timer: any;
  private started: boolean = false;
  private recalled: boolean = false;
  private arrivalTime: Date;
  private remaining: number = 0;
  private initial: string;

  constructor(private timePipe: TimePipe) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
      this.setInitialTime(changes.flightTime.currentValue);
  }

  private setInitialTime(flightTime: number) {
    if(isNaN(flightTime) || flightTime === Infinity) {
      this.initial = null;
      return;
    }

    var result = this.timePipe.transform(this.flightTime);

    this.initial = result;
  }

  private start(): void {
    if(this.timer) this.timer.unsubscribe();

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

  private recall(): void {
    this.recalled = true;

    var endTime = new Date();
    endTime.setTime(endTime.getTime() + (this.flightTime - this.remaining) * 1000);
    this.arrivalTime = endTime;
  }

  private stop(): void {
    if(this.timer) {
      this.timer.unsubscribe();
      this.timer = null;
    }

    this.started = false;
    this.recalled = false;
    this.remaining = 0;
  }

  private tick(): void {
    var now:Date = new Date();
    if(this.arrivalTime < now) {
      if(!this.recalled) {
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

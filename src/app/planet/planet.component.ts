import { Component, OnInit } from '@angular/core';
import { Calculator } from '../calculator';
import { Ship, Drive } from '../ship';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})

export class PlanetComponent implements OnInit {
  model: Calculator = {
    start: {
      galaxy: 1,
      system: 1,
      planet: 1
    },
    end: {
      galaxy: 1,
      system: 1,
      planet: 1
    },
    speed: 1,
    modifier: 3,
    initial: null,
    combustion: 15,
    impulse: 12,
    hyperspace: 10
  };

  modifiers: number[] = [1,2,3,4,5];

  speeds: number[] = [1,2,3,4,5,6,7,8,9,10];

  flightTime: number;
  remaining: number = 0;

  started: boolean = false;
  recalled: boolean = false;

  timer: any;
  ships: Ship[] = [
    {
      name: "Small Cargo",
      speed1: 5000,
      speed2: 10000,
      engine: 1,
      capacity: 5000
    },
    {
      name: "Large Cargo",
      speed1: 7500,
      speed2: 0,
      engine: 1,
      capacity: 25000
    },
    {
      name: "Light Fighter",
      speed1: 12500,
      speed2: 0,
      engine: 1,
      capacity: 50
    },
    {
      name: "Heavy Fighter",
      speed1: 10000,
      speed2: 0,
      engine: 2,
      capacity: 100
    },
    {
      name: "Cruiser",
      speed1: 15000,
      speed2: 0,
      engine: 2,
      capacity: 800
    },
    {
      name: "Battleship",
      speed1: 10000,
      speed2: 0,
      engine: 3,
      capacity: 1500
    },
    {
      name: "Colony Ship",
      speed1: 2500,
      speed2: 0,
      engine: 2,
      capacity: 7500
    },
    {
      name: "Recycler",
      speed1: 2000,
      speed2: 0,
      engine: 1,
      capacity: 20000
    },
    {
      name: "Espionage Probe",
      speed1: 100000000,
      speed2: 0,
      engine: 1,
      capacity: 0
    },
    {
      name: "Bomber",
      speed1: 4000,
      speed2: 5000,
      engine: 2,
      capacity: 500
    },
    {
      name: "Destroyer",
      speed1: 5000,
      speed2: 0,
      engine: 3,
      capacity: 2000
    },
    {
      name: "Deathstar",
      speed1: 100,
      speed2: 0,
      engine: 3,
      capacity: 1000000
    },
    {
      name: "Battlecruiser",
      speed1: 10000,
      speed2: 0,
      engine: 3,
      capacity: 750
    }
  ];

  constructor() { }

  ngOnInit() {
    this.refresh();
  }

  refresh(): void {
    this.flightTime = this.calculateFlightTime();
    if(isNaN(this.flightTime) || this.flightTime === Infinity) {
      this.model.initial = null;
      return;
    }
    var date = new Date(null);
    date.setSeconds(this.flightTime); // specify value for SECONDS here
    var result = date.toISOString().substr(11, 8);

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

  startTimer(endTime): void {
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

  stopTimer(): void {
    clearInterval(this.timer);
    this.timer = null;
    this.started = false;
    this.recalled = false;
  }

  calculateSpeed(): number {
    var result = 0;
    for(var i = 0; i< this.ships.length; ++i) {
      var ship = this.ships[i];

      if(!ship.selected) continue;

      var level = (ship.engine == 0) ? this.model.combustion :
        (ship.engine == 1) ? this.model.impulse :
        this.model.hyperspace;

      var speed = ship.speed1;
      var bonus = ship.engine / 10;

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

  calculateFlightTime(): number {
    var d = this.calculateDistance();
    var v = this.calculateSpeed();
    var s = this.model.speed;
    var a = this.model.modifier;
    return Math.round((10 + (3500 / s) * Math.sqrt((10 * d) / v)) / a);
  }

  calculateDistance(): number {
    if(this.model.start.galaxy === this.model.end.galaxy &&
      this.model.start.system === this.model.end.system &&
      this.model.start.planet === this.model.end.planet) {
      return 5;
    }

    var gal = 20000 * Math.abs(this.model.start.galaxy - this.model.end.galaxy);
    var sys = 2700 + 95 * Math.abs(this.model.start.galaxy - this.model.end.galaxy);
    var plan = 1000 + 5 * Math.abs(this.model.start.galaxy - this.model.end.galaxy);

    return gal + sys + plan;
  }

}

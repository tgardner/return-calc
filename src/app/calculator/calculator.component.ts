import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Calculator } from '../calculator';
import { Planet } from '../planet';
import { ActivatedRoute, Router } from '@angular/router';

interface ICalculatorComponent {
  calculate(calculator: Calculator): void;
}

export enum CalculatorType {
  Deploy,
  Recycle
}

@Component({
  selector: 'app-planet',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @ViewChild("calculator")
  calculator: ICalculatorComponent;

  public model = new Calculator({
    start: new Planet(1, 1, 1),
    end: new Planet(1, 1, 2),
    combustion: 18,
    impulse: 15,
    hyperspace: 14
  });
  public currentCalculator = CalculatorType.Deploy;
  public readonly CalculatorType = CalculatorType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      const calculatorEnum = Object.keys(CalculatorType)
        .find(key => key.toLowerCase() === params["calculator"].toLowerCase());
      this.currentCalculator = CalculatorType[calculatorEnum];
      this.changeDetector.detectChanges()
      this.calculate();

    });

    this.route.queryParams.subscribe(params => {
      if(Object.keys(params).length === 0) {
        this.update();
        return;
      }

      var model = this.model;
      for (var i in params) {
        switch (i) {
          case "start":
          case "end":
            model[i] = Planet.create(params[i]);
            break;
          case "ships":
            model.ships
              .filter(ship => params[i].indexOf(ship.name) >= 0)
              .forEach(s => s.selected = true);
            break;
          default:
            if (model.hasOwnProperty(i))
              model[i] = parseFloat(params[i]);
            break;
        }
      }
      this.model = model;
      this.calculate();
    });
  }

  public getState() {
    return {
      start: this.model.start.toString(),
      end: this.model.end.toString(),
      speed: this.model.speed,
      modifier: this.model.modifier,
      combustion: this.model.combustion,
      impulse: this.model.impulse,
      hyperspace: this.model.hyperspace,
      admiral: this.model.admiral,
      ships: this.model.ships.filter(s => s.selected).map(s => s.name)
    };
  }

  public update(): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.getState(),
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
  }

  public calculate(): void {
    this.calculator.calculate(this.model);
  }

  public isLinkActive(url: string): boolean {
    return (('/' + this.route.snapshot.url.join('/')) === url);
  }
}

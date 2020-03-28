import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Calculator } from '../calculator';
import { Planet } from '../planet';
import { ActivatedRoute, Router } from '@angular/router';
import { SHIPS } from '../ship';

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
    private changeDetector : ChangeDetectorRef) {
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
      var modelJson = params["model"];
      if (modelJson) {
        var model = JSON.parse(modelJson);
        this.model = new Calculator(model);
      } else {
        this.update();
        return;
      }

      var ships: string = (params["ships"] || "");
      ships.split(",")
        .forEach(s =>
          SHIPS.filter(ship => ship.name == s)
            .forEach(ship => ship.selected = true));

      this.calculate();
    })
  }

  public getState(): any {
    return {
      model: JSON.stringify(this.model),
      ships: SHIPS.filter(s => s.selected).map(s => s.name).join(",")
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

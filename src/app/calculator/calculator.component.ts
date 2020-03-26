import { Component, ViewChild } from '@angular/core';
import { Calculator } from '../calculator';
import { DeployCalculatorComponent } from '../deploy-calculator/deploy-calculator.component';
import { RecycleCalculatorComponent } from '../recycle-calculator/recycle-calculator.component';
import { Planet } from '../planet';
import { ActivatedRoute } from '@angular/router';

interface ICalculatorComponent {
  calculate(calculator: Calculator): void;
}

enum CalculatorType {
  Deploy,
  Recycle
}

@Component({
  selector: 'app-planet',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  @ViewChild(DeployCalculatorComponent) deployCalculator: ICalculatorComponent;
  @ViewChild(RecycleCalculatorComponent) recycleCalculator: ICalculatorComponent;

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
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let type = params['calculator'] == "recycle" ? CalculatorType.Recycle : CalculatorType.Deploy;
      this.setCalculator(type);
    });
  }

  public setCalculator(type: CalculatorType): void {
    this.currentCalculator = type;
    this.calculate();
  }

  public calculate(): void {
    switch (this.currentCalculator) {
      case CalculatorType.Deploy:
        this.deployCalculator.calculate(this.model);
        break;
      case CalculatorType.Recycle:
        this.recycleCalculator.calculate(this.model);
        break;
    }
  }
}

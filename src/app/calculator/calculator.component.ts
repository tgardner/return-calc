import { Component, ViewChild } from '@angular/core';
import { Calculator, Planet } from '../calculator';
import { DeployCalculatorComponent } from '../deploy-calculator/deploy-calculator.component';
import { RecycleCalculatorComponent } from '../recycle-calculator/recycle-calculator.component';

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
  @ViewChild(DeployCalculatorComponent) deployCalculator;
  @ViewChild(RecycleCalculatorComponent) recycleCalculator;

  private model: Calculator;
  private calculators: Map<CalculatorType, string> = new Map<CalculatorType, string>([
    [CalculatorType.Deploy, "Deploy"],
    [CalculatorType.Recycle, "Recycle"]
  ]);
  private currentCalculator: CalculatorType;
  private calculatorTypes = CalculatorType;

  constructor() {
    var calculator = new Calculator(new Planet(1,1,1), new Planet(1,1,1));

    // Just populate the initial model with some values
    calculator.combustion = 16;
    calculator.impulse = 13;
    calculator.hyperspace = 12;

    this.model = calculator;
    this.currentCalculator = CalculatorType.Deploy;
  }

  private calculate(): void {
    this.deployCalculator.calculate(this.model);
    this.recycleCalculator.calculate(this.model);
  }
}

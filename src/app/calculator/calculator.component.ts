import { Component, OnInit } from '@angular/core';
import { Calculator, Planet } from '../calculator';

@Component({
  selector: 'app-planet',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  model: Calculator;

  private flightTime: number;

  constructor() {
    var calculator = new Calculator(new Planet(1,1,1), new Planet(1,1,1));

    // Just populate the initial model with some values
    calculator.combustion = 16;
    calculator.impulse = 13;
    calculator.hyperspace = 12;

    this.model = calculator;
  }

  ngOnInit() {
  }

  refresh(): void {
    this.flightTime = this.model.calculateFlightTime();
  }
}

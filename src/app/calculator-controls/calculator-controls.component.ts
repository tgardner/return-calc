import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Calculator } from '../calculator';
import { SHIPS } from '../ship';

@Component({
  selector: 'app-calculator-controls',
  templateUrl: './calculator-controls.component.html',
  styleUrls: ['./calculator-controls.component.scss']
})
export class CalculatorControlsComponent {
  @Input() model: Calculator;
  @Input() hidePlanet: boolean = false;

  @Output() change: EventEmitter<Calculator> = new EventEmitter<Calculator>();

  public readonly modifiers: number[] = [1,2,3,4,5];

  public readonly speeds: number[] = [.1,.2,.3,.4,.5,.6,.7,.8,.9,1];
  public readonly admiralBonuses: number[] = [0,.1,.2];

  public readonly ships = SHIPS;

  constructor() {
  }

  public onChange(): void {
    this.change.emit(this.model);
  }
}

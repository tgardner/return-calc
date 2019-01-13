import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Calculator } from '../calculator';
import { Ship, SHIPS } from '../ship';

@Component({
  selector: 'app-calculator-controls',
  templateUrl: './calculator-controls.component.html',
  styleUrls: ['./calculator-controls.component.scss']
})
export class CalculatorControlsComponent implements OnInit {
  @Input() model: Calculator;
  @Input() hidePlanet: boolean = false;

  @Output() change: EventEmitter<Calculator> = new EventEmitter<Calculator>();

  private modifiers: number[] = [1,2,3,4,5];

  private speeds: number[] = [.1,.2,.3,.4,.5,.6,.7,.8,.9,1];

  private ships: Ship[] = SHIPS;

  constructor() {
  }

  ngOnInit() {
  }

  private onChange() {
    this.change.emit(this.model);
  }
}

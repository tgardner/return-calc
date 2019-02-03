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

  public modifiers: number[] = [1,2,3,4,5];

  public speeds: number[] = [.1,.2,.3,.4,.5,.6,.7,.8,.9,1];
  public admiralBonuses: number[] = [0,.1,.2];

  public ships: Ship[] = SHIPS;

  constructor() {
  }

  ngOnInit() {
  }

  public onChange(): void {
    this.change.emit(this.model);
  }
}

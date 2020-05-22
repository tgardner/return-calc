import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Calculator } from '../../calculator';

@Component({
  selector: 'app-calculator-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  @Input() model: Calculator;
  @Input() hidePlanet = false;

  @Output() change: EventEmitter<Calculator> = new EventEmitter<Calculator>();

  public readonly modifiers: number[] = [1, 2, 3, 4, 5];
  public readonly speeds: number[] = [.1, .2, .3, .4, .5, .6, .7, .8, .9, 1];
  public readonly admiralBonuses: number[] = [0, .1, .2];

  constructor() {
  }

  public onChange(): void {
    this.change.emit(this.model);
  }
}

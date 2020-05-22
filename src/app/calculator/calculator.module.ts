import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { DeployComponent } from './components/deploy/deploy.component';
import { RecycleComponent } from './components/recycle/recycle.component';
import { ControlsComponent } from './components/controls/controls.component';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DeployComponent,
    RecycleComponent,
    ControlsComponent,
    CalculatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CalculatorRoutingModule,
    SharedModule
  ]
})
export class CalculatorModule { }

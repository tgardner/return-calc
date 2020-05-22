import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { DeployComponent } from './components/deploy/deploy.component';
import { RecycleComponent } from './components/recycle/recycle.component';
import { ControlsComponent } from './components/controls/controls.component';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  declarations: [
    DeployComponent,
    RecycleComponent,
    ControlsComponent,
    CalculatorComponent,
    TimePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    CalculatorRoutingModule
  ],
  providers: [
    TimePipe
  ]
})
export class CalculatorModule { }

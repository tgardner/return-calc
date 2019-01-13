import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { TimePipe } from './time.pipe';
import { CalculatorControlsComponent } from './calculator-controls/calculator-controls.component';
import { DeployCalculatorComponent } from './deploy-calculator/deploy-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    TimePipe,
    CalculatorControlsComponent,
    DeployCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [TimePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationsModule } from './locations/locations.module';
import { ProfitModule } from './profit/profit.module';
import { CalculatorModule } from './calculator/calculator.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LocationsModule,
    ProfitModule,
    CalculatorModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

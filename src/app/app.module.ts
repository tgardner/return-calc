import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { TimePipe } from './time.pipe';
import { CalculatorControlsComponent } from './calculator-controls/calculator-controls.component';
import { DeployCalculatorComponent } from './deploy-calculator/deploy-calculator.component';
import { RecycleCalculatorComponent } from './recycle-calculator/recycle-calculator.component';
import { LocationListComponent } from './location-list/location-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    TimePipe,
    CalculatorControlsComponent,
    DeployCalculatorComponent,
    RecycleCalculatorComponent,
    LocationListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    TimePipe,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

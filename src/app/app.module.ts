import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { TimePipe } from './time.pipe';
import { CalculatorControlsComponent } from './calculator-controls/calculator-controls.component';
import { DeployCalculatorComponent } from './deploy-calculator/deploy-calculator.component';
import { RecycleCalculatorComponent } from './recycle-calculator/recycle-calculator.component';
import { LocationListComponent } from './location-list/location-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfitCalculatorComponent } from './profit-calculator/profit-calculator.component';
import { SheetServiceConfig } from './locations/sheet.service';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    TimePipe,
    CalculatorControlsComponent,
    DeployCalculatorComponent,
    RecycleCalculatorComponent,
    LocationListComponent,
    PageNotFoundComponent,
    ProfitCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [
    TimePipe,
    Title,
    {
      provide: SheetServiceConfig, useValue: {
        url: "https://docs.google.com/spreadsheets/d/1-jGoyvLPn1WqqtxzldSBXVA_i8kJxJNGejQbcOTbXFs"
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfitCalculatorComponent } from './profit-calculator/profit-calculator.component';
import { LocationsModule } from './locations/locations.module';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    TimePipe,
    CalculatorControlsComponent,
    DeployCalculatorComponent,
    RecycleCalculatorComponent,
    PageNotFoundComponent,
    ProfitCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    CKEditorModule,
    LocationsModule
  ],
  providers: [
    TimePipe,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

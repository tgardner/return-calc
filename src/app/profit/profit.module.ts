import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfitRoutingModule } from './profit-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { ProfitCalculatorComponent } from './components/calculator/calculator.component';


@NgModule({
  declarations: [
    ProfitCalculatorComponent
  ],
  imports: [
    CommonModule,
    ProfitRoutingModule,
    FormsModule,
    CKEditorModule
  ]
})
export class ProfitModule { }

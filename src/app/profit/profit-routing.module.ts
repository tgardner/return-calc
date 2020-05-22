import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfitCalculatorComponent } from './components/calculator/calculator.component';


const routes: Routes = [
  { path: '', component: ProfitCalculatorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfitRoutingModule { }

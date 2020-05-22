import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationsModule } from './locations/locations.module';
import { ProfitModule } from './profit/profit.module';
import { CalculatorModule } from './calculator/calculator.module';

const routes: Routes = [
  { path: 'profit', loadChildren: () => ProfitModule },
  { path: 'locations', loadChildren: () => LocationsModule },
  { path: '', loadChildren: () => CalculatorModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

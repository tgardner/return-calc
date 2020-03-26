import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationListComponent } from './location-list/location-list.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfitCalculatorComponent } from './profit-calculator/profit-calculator.component';
import { CalculatorGuard } from './calculator.guard';

const routes: Routes = [
  { path: 'locations', component: LocationListComponent },
  { path: 'profit', component: ProfitCalculatorComponent },
  {
    path: ':calculator',
    component: CalculatorComponent,
    canActivate: [CalculatorGuard]
  },
  {
    path: '',
    redirectTo: '/deploy',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

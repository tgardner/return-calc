import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { DeployComponent } from './components/deploy/deploy.component';
import { RecycleComponent } from './components/recycle/recycle.component';


const routes: Routes = [
  {
    path: '',
    component: CalculatorComponent,
    children: [
      { path: '', redirectTo: 'deploy', pathMatch: 'full' },
      { path: 'deploy', component: DeployComponent },
      { path: 'recycle', component: RecycleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorRoutingModule { }

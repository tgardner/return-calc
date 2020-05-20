import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationListComponent } from './list.component';

const routes: Routes = [
  { path: '',  component: LocationListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class LocationRoutingModule {
}
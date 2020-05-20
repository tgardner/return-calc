import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './list.component';
import { FormsModule } from '@angular/forms';
import { LocationRoutingModule } from './location-routing.module';
import { ConfigModule } from '../config/config.module';
import { LocationServiceProvider } from './location.service.provider';

@NgModule({
  declarations: [
    LocationListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LocationRoutingModule,
    ConfigModule
  ],
  providers: [
    LocationServiceProvider
  ]
})
export class LocationsModule { }

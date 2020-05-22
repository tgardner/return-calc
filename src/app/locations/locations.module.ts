import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './components/list/list.component';
import { FormsModule } from '@angular/forms';
import { LocationRoutingModule } from './location-routing.module';
import { ConfigModule } from '../config/config.module';
import { StorageModule } from '../storage/storage.module';

@NgModule({
  declarations: [
    LocationListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LocationRoutingModule,
    ConfigModule,
    StorageModule
  ]
})
export class LocationsModule { }

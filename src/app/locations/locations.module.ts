import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheetServiceConfig } from './sheet.service';
import { JsonServiceConfig } from './json.service';
import { JsonbinServiceConfig, JsonbinService } from './jsonbin.service';
import { LocationListComponent } from './list.component';
import { FormsModule } from '@angular/forms';
import { LocationRoutingModule } from './location-routing.module';
import { LocationService } from './location.service';

@NgModule({
  declarations: [
    LocationListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LocationRoutingModule
  ],
  providers: [
    {
      provide: LocationService, useClass: JsonbinService
    },
    {
      provide: SheetServiceConfig, useValue: {
        url: "https://docs.google.com/spreadsheets/d/1-jGoyvLPn1WqqtxzldSBXVA_i8kJxJNGejQbcOTbXFs"
      }
    },
    {
      provide: JsonServiceConfig, useValue: {
        url: "/assets/data.json"
      }
    },
    {
      provide: JsonbinServiceConfig, useValue: {
        secretKey: "$2b$10$n.92mRWeif1bwrr11kK3OO0CfiEcu.xTz5sGu4/31R1JA5b9dpGV6",
        binId: "5eae628947a2266b1471d702"
      }
    }
  ]
})
export class LocationsModule { }

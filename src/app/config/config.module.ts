import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvServiceProvider } from './env.service.provider';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    EnvServiceProvider
  ]
})
export class ConfigModule { }

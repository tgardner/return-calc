import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageServiceProvider } from './storage.service.provider';
import { HttpClientModule } from '@angular/common/http';
import { ConfigModule } from '../config/config.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule
  ],
  providers: [
    StorageServiceProvider
  ]
})
export class StorageModule { }

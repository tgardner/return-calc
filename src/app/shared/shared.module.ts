import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePipe } from './time.pipe';


@NgModule({
  declarations: [
    TimePipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TimePipe
  ],
  exports: [
    TimePipe
  ]
})
export class SharedModule {
}

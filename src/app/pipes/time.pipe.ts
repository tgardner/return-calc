import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'toTime'})
export class TimeFormatPipe implements PipeTransform {
  transform(time: any): any {
    if(isNaN(time) || time == 0) return;

    var date = new Date(null);
    date.setSeconds(time); // specify value for SECONDS here
    var result = date.toISOString().substr(11, 8);
    return result;
  }
}

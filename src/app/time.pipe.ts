import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time: any, args?: any): any {
    if(isNaN(time)) return;

    var seconds = time % 60;
    var minutes = Math.floor((time % 3600 - seconds) / 60);
    var hours = Math.floor((time - minutes - seconds) / 3600);
    return ("00" + hours).slice(-2) + ":" + ("00" + minutes).slice(-2) + ":" + ("00" + seconds).slice(-2);
  }

}

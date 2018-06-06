import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ReverseOrderPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'reverseOrder',
})
export class ReverseOrderPipe implements PipeTransform {
  transform(values: any[]) {
    if (values) {
      return values.reverse();
    }
  }
}

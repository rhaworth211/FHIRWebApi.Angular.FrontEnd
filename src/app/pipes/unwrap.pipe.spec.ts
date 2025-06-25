import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unwrap',
  standalone: true
})
export class UnwrapPipe implements PipeTransform {
  transform(input: any): any {
    while (input && typeof input === 'object' && 'value' in input) {
      input = input.value;
    }
    return input;
  }
}
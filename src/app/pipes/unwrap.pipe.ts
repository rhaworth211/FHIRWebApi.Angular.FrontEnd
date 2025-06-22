import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unwrap',
  standalone: true
})
export class UnwrapPipe implements PipeTransform {

  transform(value: any): any {
    return this.unwrap(value);
  }

  private unwrap(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(o => this.unwrap(o));
    } else if (obj && typeof obj === 'object' && 'value' in obj && Object.keys(obj).length === 1) {
      return obj.value;
    } else if (obj && typeof obj === 'object') {
      const newObj: any = {};
      for (const key of Object.keys(obj)) {
        newObj[key] = this.unwrap(obj[key]);
      }
      return newObj;
    }
    return obj;
  }
}

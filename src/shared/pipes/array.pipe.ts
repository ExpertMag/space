import { Pipe, PipeTransform } from '@angular/core';
import { Mission } from 'src/app/list/item/item.dto';

@Pipe({ name: 'concatMissions' })
export class ConcatPipe implements PipeTransform {
  transform(value?: Mission[]): string {
    if (!value || !value.length) return '';
    return value.map((x) => x.name).join(', ');
  }
}

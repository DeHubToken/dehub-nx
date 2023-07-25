import { Pipe, PipeTransform } from '@angular/core';
import { formatSIPostfix } from '@dehub/shared/utils';

@Pipe({
  name: 'dhbSIPostfix',
  standalone: true,
  pure: true,
})
export class SIPostfixPipe implements PipeTransform {
  constructor() {}

  transform(value: number): string {
    return formatSIPostfix(value);
  }
}

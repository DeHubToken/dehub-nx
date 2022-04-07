import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'as',
  pure: true,
})
export class AsPipe implements PipeTransform {
  // Reason: this pipe can accept literally any type.
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  transform<T>(value: any, _type: (new (...args: any[]) => T) | T): T {
    return value as T;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'as', pure: true })
export class AsPipe implements PipeTransform {
  transform<S, T extends S>(value: S, type?: new () => T): T {
    return <T>value;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { shortenAddress } from '@dehub/shared/utils';

@Pipe({
  name: 'dhbAddress',
  standalone: true,
  pure: true,
})
export class AddressPipe implements PipeTransform {
  transform(ethAddress: string): string {
    return shortenAddress(ethAddress);
  }
}

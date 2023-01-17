import { Pipe, PipeTransform } from '@angular/core';
import { shortenAddress } from '@dehub/shared/utils';

@Pipe({
  pure: true,
  name: 'dhbAddress',
  standalone: true,
})
export class AddressPipe implements PipeTransform {
  transform(ethAddress: string): string {
    return shortenAddress(ethAddress);
  }
}

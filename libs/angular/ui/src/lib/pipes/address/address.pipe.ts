import { Pipe, PipeTransform } from '@angular/core';
import { shortenAddress } from '@dehub/shared/utils';

@Pipe({
  name: 'dhbAddress',
  standalone: true,
  pure: true,
})
export class AddressPipe implements PipeTransform {
  transform(ethAddress: string, lowerCase = false): string {
    const shortenedAddress = shortenAddress(ethAddress);
    return lowerCase ? shortenedAddress.toLowerCase() : shortenedAddress;
  }
}

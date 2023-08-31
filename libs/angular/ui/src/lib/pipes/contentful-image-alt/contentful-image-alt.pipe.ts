import { Pipe, PipeTransform } from '@angular/core';
import { AssetFragment } from '@dehub/shared/model';
import { getContentfulImageAlt } from '@dehub/shared/utils';

@Pipe({
  name: 'dhbContentfulImageAlt',
  standalone: true,
  pure: true,
})
export class ContentfulImageAltPipe implements PipeTransform {
  transform(asset: AssetFragment, fallbackAlt?: string) {
    return getContentfulImageAlt(asset, fallbackAlt);
  }
}

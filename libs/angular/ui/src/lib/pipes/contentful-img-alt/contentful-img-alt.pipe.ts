import { Pipe, PipeTransform } from '@angular/core';
import { AssetFragment } from '@dehub/shared/model';

@Pipe({
  name: 'dhbContentfulImgAlt',
  standalone: true,
  pure: true,
})
export class ContentfulImgAltPipe implements PipeTransform {
  transform(
    { description, title }: AssetFragment,
    fallbackAlt = 'image'
  ): unknown {
    return `${description ?? title ?? fallbackAlt}`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { CallToActionFragment } from '@dehub/shared/model';

@Pipe({ standalone: true, name: 'dhbCTAGroup', pure: true })
export class CTAGroupPipe implements PipeTransform {
  constructor() {}

  /**
   * Group Call To Action links
   * @param items the CTA links
   * @param groupSize the number of group links per column
   * @returns grouped CTA links
   */
  transform(
    items?: (CallToActionFragment | undefined)[],
    groupSize = 2
  ): (CallToActionFragment | undefined)[][] {
    const linkGroups: (CallToActionFragment | undefined)[][] = [];

    if (items) {
      for (let i = 0; i < items.length; i += groupSize) {
        const group = items.slice(i, i + groupSize);
        linkGroups.push(group);
      }
    }
    return linkGroups;
  }
}

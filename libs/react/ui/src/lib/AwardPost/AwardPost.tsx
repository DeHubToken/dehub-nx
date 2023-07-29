import { AwardPostFragment } from '@dehub/shared/model';
import {
  getContentfulImageAlt,
  getContentfulImageSrcSet,
} from '@dehub/shared/utils';
import { memo } from 'react';

const AwardPost = ({
  awardPost: { picture: award, link },
}: {
  awardPost: AwardPostFragment;
}) =>
  award && award.url && link ? (
    <a href={link} target="_blank" rel="noreferrer">
      <img
        srcSet={getContentfulImageSrcSet(award.url, { cornerRadius: 1000 })}
        width={award.width}
        height={award.height}
        loading="lazy"
        alt={getContentfulImageAlt(award)}
        sizes="(max-width: 750px) 30vw, 5vw"
        className="w-6 md:w-9 h-auto anim-hover-1-reverse"
      />
    </a>
  ) : (
    <>&nbsp;</>
  );

export default memo(AwardPost);

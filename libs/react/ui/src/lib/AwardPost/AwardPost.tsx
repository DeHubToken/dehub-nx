import { AwardPostFragment } from '@dehub/shared/model';
import { memo } from 'react';

const AwardPost = ({
  awardPost: { picture: award, link },
}: {
  awardPost: AwardPostFragment;
}) =>
  award && link ? (
    <a href={link} target="_blank" rel="noreferrer">
      <img
        src={award.webpUrlWithRadius}
        width={award.width}
        height={award.height}
        alt={award.description ?? award.title}
        sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
        className="w-6 md:w-9 h-auto anim-hover-1-reverse"
      />
    </a>
  ) : (
    <>&nbsp;</>
  );

export default memo(AwardPost);

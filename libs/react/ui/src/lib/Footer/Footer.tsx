import { CallToActionFragment, FooterFragment } from '@dehub/shared/model';
import {
  resolveButtonStyle,
  richMarkupToHtmlString,
} from '@dehub/shared/utils';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { memo, useMemo } from 'react';
import Logo, { LogoTypes } from '../Header/Logo';

export interface FooterProps {
  footer?: FooterFragment;
  ctaGroup?: number;
  landing: string;
  logo: LogoTypes;
}

function Footer({ footer, ctaGroup = 5, landing, logo }: FooterProps) {
  const groups = useMemo(() => {
    if (!footer?.linksCollection) return undefined;

    const linkGroups: (CallToActionFragment | undefined)[][] = [];
    for (let i = 0; i < footer.linksCollection.items.length; i += ctaGroup) {
      const group = footer.linksCollection.items.slice(i, i + ctaGroup);
      linkGroups.push(group);
    }
    return linkGroups;
  }, [footer?.linksCollection, ctaGroup]);

  const awards = footer?.awardsCollection?.items;
  const thisYear = new Date().getFullYear();

  return (
    <div className="layout-footer">
      <div className="grid">
        <div className="col-12 lg-4">
          <div className="grid">
            {/* Links */}
            <div className="col-12 md:col-4 lg:col-2">
              {groups &&
                groups.map((group, index) => (
                  <ul key={index}>
                    {group.map((link, index2) => (
                      <li key={index2}>
                        <a
                          className={resolveButtonStyle(
                            link?.type,
                            link?.style,
                            link?.size
                          )}
                          href={landing + link?.routerLink}
                        >
                          <i className={link?.icon}></i>
                          {link && link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
            </div>
            {/* Awards */}
            <div className="col-12 md:col-4 lg:col-2">
              {awards &&
                awards.map(award => (
                  <img
                    src={award.webpUrlWithRadius}
                    width={award.width}
                    height={award.height}
                    alt={award.description ?? award.title}
                    sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
                    className="w-6 md:w-9 h-auto anim-hover-1-reverse"
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="footer-bottom flex-wrap gap-3">
            <ul className="block w-full mb-3">
              {/* Social Links */}
              {footer?.socialIconsCollection?.items.map((socialLink, index) => (
                <li key={index} className="inline">
                  <Button
                    className={classNames(
                      resolveButtonStyle(
                        socialLink?.type,
                        socialLink?.style,
                        socialLink?.size
                      ),
                      'text-white justify-content-start w-3rem px-0'
                    )}
                    onClick={() => {
                      window.open(
                        socialLink?.externalLink,
                        '_blank',
                        'noreferrer noopener'
                      );
                    }}
                    icon={socialLink?.icon}
                  />
                </li>
              ))}
            </ul>

            <div className="flex align-items-end gap-2 mb-2">
              {/* Logo */}
              <Logo logo={logo} />
              <h6 className="uppercase font-bold text-xs">
                {footer?.copyright}
              </h6>
            </div>

            {/* Address */}
            <div
              dangerouslySetInnerHTML={{
                __html: richMarkupToHtmlString(footer?.address?.json),
              }}
              className="line-height-3 block w-full"
            />

            {/* Year */}
            <h6 className="uppercase font-bold text-xs">© {thisYear}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Footer);

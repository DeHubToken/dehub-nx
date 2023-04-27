import { CallToActionFragment, FooterFragment } from '@dehub/shared/model';
import { resolveButtonStyle } from '@dehub/shared/utils';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { memo, useMemo } from 'react';

export interface FooterProps {
  footer?: FooterFragment;
  ctaGroup?: number;
  landing: string;
}

function Footer({ footer, ctaGroup = 5, landing }: FooterProps) {
  const groups = useMemo(() => {
    if (!footer?.linksCollection) return undefined;

    const linkGroups: (CallToActionFragment | undefined)[][] = [];
    for (let i = 0; i < footer.linksCollection.items.length; i += ctaGroup) {
      const group = footer.linksCollection.items.slice(i, i + ctaGroup);
      linkGroups.push(group);
    }
    return linkGroups;
  }, [footer?.linksCollection, ctaGroup]);

  return (
    <div className="layout-footer">
      <div className="grid">
        <div className="col-12 lg-4">
          <div className="grid">
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
          </div>
        </div>

        <div className="col-12">
          <div className="footer-bottom flex-wrap">
            <ul className="block w-full mb-3">
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
            <h4 className="mr-0">DeHub&nbsp;|&nbsp;</h4>
            <h6 className="uppercase font-bold text-xs">{footer?.copyright}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Footer);

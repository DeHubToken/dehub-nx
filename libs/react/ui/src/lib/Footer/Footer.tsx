import { FooterFragment } from '@dehub/shared/model';
import { resolveButtonStyle } from '@dehub/shared/utils';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { memo } from 'react';

export interface FooterProps {
  footer?: FooterFragment;
}

function Footer({ footer }: FooterProps) {
  return (
    <div className="layout-footer">
      <div className="grid">
        <div className="col-12 lg-4">
          <div className="grid">
            <div className="col-12 md:col-4 lg:col-2">
              {footer &&
                footer.linksCollection?.items.map((item, index) => (
                  <ul key={index}>
                    <li>
                      <a
                        className={resolveButtonStyle(
                          item?.type,
                          item?.style,
                          item?.size
                        )}
                        href={item?.routerLink}
                      >
                        <i className={item?.icon}></i>
                        {item && item.label}
                      </a>
                    </li>
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

import { memo } from 'react';

export interface FooterProps {
  landing: string;
}

function Footer({ landing }: FooterProps) {
  return (
    <div className="layout-footer">
      <div className="flex flex-wrap align-items-center justify-content-center card-container">
        <div className="text-lg">DeHub&nbsp;</div>
        <div className="text-lg">&nbsp;© 2021 DeHub.</div>
      </div>
      <div className="flex flex-wrap align-items-center justify-content-center card-container">
        <ul>
          <li>
            <a href={landing} className="p-link mb-2 mx-2">
              Disclaimer
            </a>
          </li>
        </ul>
        &nbsp;|&nbsp;
        <ul>
          <li>
            <a href={`${landing}/privacy-policy`} className="p-link mb-2 mx-2">
              Privacy Policy
            </a>
          </li>
        </ul>
        &nbsp;|&nbsp;
        <ul>
          <li>
            <a href={`${landing}/terms`} className="p-link mb-2 mx-2">
              Terms & Conditions
            </a>
          </li>
        </ul>
        &nbsp;|&nbsp;
        <ul>
          <li>
            <a href={`${landing}/careers`} className="p-link mb-2 mx-2">
              Careers
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default memo(Footer);

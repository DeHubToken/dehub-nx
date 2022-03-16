import { memo } from 'react';

export interface FooterProps {
  landing: string;
}

function Footer({ landing }: FooterProps) {
  return (
    <div className="layout-footer">
      <div className="grid">
        <div className="col-12 lg-4">
          <div className="grid">
            <div className="col-6">
              <span className="footer-menutitle"></span>
              <ul>
                <li>
                  <a href={`${landing}/web/legal/disclaimer`}>Disclaimer</a>
                </li>
                <li>
                  <a href={`${landing}/web/legal/privacy`}>Privacy Policy</a>
                </li>
                <li>
                  <a href={`${landing}/web/legal/terms`}>Terms & Conditions</a>
                </li>
                <li>
                  <a href={`${landing}/web/legal/careers`}>Careers</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="footer-bottom">
            <h4>DeHub</h4>
            <h6>© 2022 DeHub.</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Footer);

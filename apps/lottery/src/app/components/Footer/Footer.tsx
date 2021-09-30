/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  const history = useHistory();

  return (
    <div className="layout-footer">
      <div className="flex flex-wrap align-items-center justify-content-center card-container">
        <div className="text-lg">DeHub&nbsp;</div>
        <div className="text-lg">&nbsp;© 2021 DeHub.</div>
      </div>
      <div className="flex flex-wrap align-items-center justify-content-center card-container">
        <ul><li>
          <a href="#" className="p-link mb-2 mx-2" onClick={() => history.push('/privacy-policy')}>Disclaimer</a>
        </li></ul>&nbsp;|&nbsp;
        <ul><li>
          <a href="#" className="p-link mb-2 mx-2" onClick={() => history.push('/privacy-policy')}>Privacy Policy</a>
        </li></ul>&nbsp;|&nbsp;
        <ul><li>
          <a href="#" className="p-link mb-2 mx-2" onClick={() => history.push('/terms')}>Terms & Conditions</a>
        </li></ul>&nbsp;|&nbsp;
        <ul><li>
          <a href="#" className="p-link mb-2 mx-2" onClick={() => history.push('/careers')}>Careers</a>
        </li></ul>
      </div>
    </div>
  )
}

export default memo(Footer)
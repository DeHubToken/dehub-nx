/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react';

/* eslint-disable-next-line */
export interface FooterProps {}

function Footer(props: FooterProps) {

  return (
    <div className="layout-footer">
      <div className="flex flex-wrap align-items-center justify-content-center card-container">
        <div className="text-lg">DeHub&nbsp;</div>
        <div className="text-lg">&nbsp;© 2021 DeHub.</div>
      </div>
      <div className="flex flex-wrap align-items-center justify-content-center card-container">
        <ul><li>
          <a href="/declaimer" className="p-link mb-2 mx-2">Disclaimer</a>
        </li></ul>&nbsp;|&nbsp;
        <ul><li>
          <a href="/privacy-policy" className="p-link mb-2 mx-2">Privacy Policy</a>
        </li></ul>&nbsp;|&nbsp;
        <ul><li>
          <a href="/terms" className="p-link mb-2 mx-2">Terms & Conditions</a>
        </li></ul>&nbsp;|&nbsp;
        <ul><li>
          <a href="/careers" className="p-link mb-2 mx-2">Careers</a>
        </li></ul>
      </div>
    </div>
  )
}

export default Footer;
import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { getBaseUrl } from '../../config/constants';

const PageMeta = () => {
  const path = getBaseUrl();

  return (
    <Helmet>
      <title>DeHub Prize Draw</title>
      <base href={`${path}/`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="icon"
        type="image/x-icon"
        href={`${path}/assets/dehub/icon-dehub-white.svg`}
      />
      <link
        id="theme"
        rel="stylesheet"
        type="text/css"
        href={`${path}/theme.css`}
      />
      <link
        id="layout"
        rel="stylesheet"
        type="text/css"
        href={`${path}/layout.css`}
      />
      <link
        id="primereact"
        rel="stylesheet"
        type="text/css"
        href={`${path}/primereact.css`}
      />
      <link
        id="primeflex"
        rel="stylesheet"
        type="text/css"
        href={`${path}/primeflex.css`}
      />
      <link
        id="primeicons"
        rel="stylesheet"
        type="text/css"
        href={`${path}/primeicons.css`}
      />
    </Helmet>
  );
};

export default PageMeta;

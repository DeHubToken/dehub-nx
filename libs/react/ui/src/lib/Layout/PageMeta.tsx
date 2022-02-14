import { Helmet } from 'react-helmet-async';

const PageMeta = ({ baseUrl, title }: { baseUrl: string; title: string }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <base href={`${baseUrl}/`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="icon"
        type="image/x-icon"
        href={`${baseUrl}/assets/dehub/icon-dehub-white.svg`}
      />
      <link
        id="theme"
        rel="stylesheet"
        type="text/css"
        href={`${baseUrl}/theme.css`}
      />
      <link
        id="layout"
        rel="stylesheet"
        type="text/css"
        href={`${baseUrl}/layout.css`}
      />
      <link
        id="primereact"
        rel="stylesheet"
        type="text/css"
        href={`${baseUrl}/primereact.css`}
      />
      <link
        id="primeflex"
        rel="stylesheet"
        type="text/css"
        href={`${baseUrl}/primeflex.css`}
      />
      <link
        id="primeicons"
        rel="stylesheet"
        type="text/css"
        href={`${baseUrl}/primeicons.css`}
      />
    </Helmet>
  );
};

export default PageMeta;

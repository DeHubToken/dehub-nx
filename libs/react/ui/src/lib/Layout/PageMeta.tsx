import { Helmet } from 'react-helmet-async';

const PageMeta = ({ baseUrl, title }: { baseUrl: string; title: string }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <base href={`${baseUrl}/`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* <!-- HTML Meta Tags --> */}
      <title>DeHub - Staking D’App</title>
      <meta name="description" content="DeHub Staking D’App." />

      {/* <!-- Google / Search Engine Tags --> */}
      <meta itemProp="name" content="DeHub - Staking D’App" />
      <meta itemProp="description" content="DeHub Staking D’App." />
      <meta
        itemProp="image"
        content="https://images.ctfassets.net/4jicnfvodfm8/1SqWTgh7HdbGfryephE7RZ/b8f43419737eb3d98c7e22e07ad6f900/dehub-logo.png?w=1200"
      />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content={baseUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Staking"></meta>
      <meta property="og:title" content="DeHub - Staking D’App" />
      <meta property="og:description" content="DeHub Staking D’App." />
      <meta
        property="og:image"
        content="https://images.ctfassets.net/4jicnfvodfm8/1SqWTgh7HdbGfryephE7RZ/b8f43419737eb3d98c7e22e07ad6f900/dehub-logo.png?w=1200"
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content="DeHub Logo" />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="DeHub - Staking D’App" />
      <meta name="twitter:description" content="DeHub Staking D’App." />
      <meta
        name="twitter:image"
        content="https://images.ctfassets.net/4jicnfvodfm8/1SqWTgh7HdbGfryephE7RZ/b8f43419737eb3d98c7e22e07ad6f900/dehub-logo.png?w=1200"
      />
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
      <link rel="manifest" href={`${baseUrl}/dehub.webmanifest`} />
    </Helmet>
  );
};

export default PageMeta;

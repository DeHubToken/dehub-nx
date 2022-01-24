import { DeHubTheme } from '@dehub/react/pcsuikit';
import { createGlobalStyle } from 'styled-components';

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends DeHubTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Exo', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`;

export default GlobalStyle;

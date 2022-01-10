import { createGlobalStyle } from 'styled-components';
import { DeHubTheme } from '@dehub/react/pcsuikit';

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends DeHubTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Metrophobic', sans-serif;
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

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/app';
import Providers from './app/Providers';

ReactDOM.render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
  document.getElementById('root')
);

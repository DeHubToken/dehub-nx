import { act, render } from '@testing-library/react';
import App from './app';
import Providers from './Providers';

/**
 * TODO: temporary commented out due to error below
 *
 * Error: Uncaught [Invariant Violation:
 * "fetch" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor. For example:
 *
 *  import fetch from 'cross-fetch';
 *  import { ApolloClient, HttpLink } from '@apollo/client';
 *  const client = new ApolloClient({
 *    link: new HttpLink({ uri: '/graphql', fetch })
 *  });
 */
xdescribe('App', () => {
  it('should render successfully', async () => {
    const promise = Promise.resolve();
    const { baseElement } = render(
      <Providers>
        <App />
      </Providers>
    );

    expect(baseElement).toBeTruthy();

    // Why act needed: https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
    await act(() => promise);
  });
});

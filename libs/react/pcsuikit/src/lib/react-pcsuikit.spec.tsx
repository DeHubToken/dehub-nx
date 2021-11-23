import { render } from '@testing-library/react';

import ReactPcsuikit from './react-pcsuikit';

describe('ReactPcsuikit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactPcsuikit />);
    expect(baseElement).toBeTruthy();
  });
});

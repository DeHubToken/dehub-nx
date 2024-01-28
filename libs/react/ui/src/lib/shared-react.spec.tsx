import { render } from '@testing-library/react';

import SharedReact from './shared-react';

describe('SharedReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedReact />);
    expect(baseElement).toBeTruthy();
  });
});

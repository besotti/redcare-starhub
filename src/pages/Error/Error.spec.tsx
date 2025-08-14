import { screen } from '@testing-library/react';

import { renderTest } from '../../__utils__/renderTest.tsx';

describe('Error', () => {
  it('should render a error page', async () => {
    renderTest({ url: '/foo' });

    expect(screen.getByText(/ops.../i));
  });
});

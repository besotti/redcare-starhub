import { screen } from '@testing-library/react';

import { renderTest } from '../../__utils__/renderTest.tsx';

describe('Repositories', () => {
  it('should render a error page', async () => {
    renderTest();

    expect(screen.getByText(/Trending Repositories/i));
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderTest } from '../../__utils__/renderTest';

describe('Error', () => {
  it('should render a error page', async () => {
    renderTest({ url: '/foo' });

    expect(await screen.findByText(/Something went wrong/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /go to homepage/i }));

    expect(await screen.findByText(/trending repositories/i)).toBeInTheDocument();
  });
});

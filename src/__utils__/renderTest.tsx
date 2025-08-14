import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { merge } from 'lodash-es';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router';

import { BASE_PATH } from '../constants/routes.ts';
import { routes } from '../routes.tsx';

interface TestPropTypes {
  url?: string;
}

const defaultArgs: TestPropTypes = {};

// setup rendering test
const setupTest = (routes: RouteObject[], args: TestPropTypes = {}) => {
  const finalArgs = merge({}, defaultArgs, args);

  const user = userEvent.setup();
  const router = createMemoryRouter(routes, {
    initialEntries: [finalArgs.url ?? BASE_PATH],
  });

  const result = render(<RouterProvider router={router} />);

  return { ...result, user };
};

// Utility function to render an app URL
export const renderTest = (args: TestPropTypes = {}) => setupTest(routes, args);

import { createRoutesFromElements, Navigate, Route } from 'react-router';

import { BASE_PATH, ROUTE_REPOSITORIES } from './constants/routes.ts';
import { ErrorPage } from './pages/Error/Error.tsx';
import { RepositoriesPage } from './pages/Repositories/Repositories.tsx';

export const routes = createRoutesFromElements(
  <Route path={BASE_PATH} errorElement={<ErrorPage />}>
    <Route errorElement={<ErrorPage />}>
      <Route element={<Navigate to={ROUTE_REPOSITORIES} />} path={BASE_PATH} />
      <Route path={ROUTE_REPOSITORIES} element={<RepositoriesPage />} />
    </Route>
  </Route>
);

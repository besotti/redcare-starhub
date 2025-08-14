import { BASE_PATH, ROUTE_REPOSITORIES } from '@constants/routes';
import { ErrorPage } from '@pages/Error/Error';
import { RepositoriesPage } from '@pages/Repositories/Repositories';
import { createRoutesFromElements, Navigate, Route } from 'react-router';

export const routes = createRoutesFromElements(
  <Route path={BASE_PATH} errorElement={<ErrorPage />}>
    <Route errorElement={<ErrorPage />}>
      <Route element={<Navigate to={ROUTE_REPOSITORIES} />} path={BASE_PATH} />
      <Route path={ROUTE_REPOSITORIES} element={<RepositoriesPage />} />
    </Route>
  </Route>
);

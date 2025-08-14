import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { BASE_PATH } from './constants/routes.ts';
import { routes } from './routes.tsx';

const container = document.querySelector('#root');
const root = createRoot(container!);
const router = createBrowserRouter(routes, {
  basename: BASE_PATH,
});

document.title = 'Redcare Starhub';

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />;
  </React.StrictMode>
);

import { BASE_PATH } from '@constants/routes';
import { queryClient } from '@root/queryClient';
import { routes } from '@root/routes';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

const container = document.querySelector('#root');
const root = createRoot(container!);
const router = createBrowserRouter(routes, {
  basename: BASE_PATH,
});

document.title = 'Redcare Starhub';

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  </React.StrictMode>
);

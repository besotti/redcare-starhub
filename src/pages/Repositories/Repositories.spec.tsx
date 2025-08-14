import { LOCAL_STORAGE_KEY } from '@constants/general';
import { ROUTE_REPOSITORIES } from '@constants/routes';
import { API_ROUTE_REPOSITORY_SEARCH } from '@root/__api__/handlers/starhub-api';
import { server } from '@root/__api__/server';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { expect } from 'vitest';

import { renderTest } from '../../__utils__/renderTest';

describe('Repositories', () => {
  it('should render a hint if the loaded repositories list is empty', async () => {
    server.use(
      http.get(`${API_ROUTE_REPOSITORY_SEARCH}`, async () => {
        return HttpResponse.json({}, { status: 200 });
      })
    );

    renderTest({ url: ROUTE_REPOSITORIES });

    expect(await screen.findByText(/No repositories to display./i));
  });

  it('should render the repository page', async () => {
    renderTest({ url: ROUTE_REPOSITORIES });

    expect(await screen.findByText(/trending repositories/i));
  });

  it('should be possible to add a star to a repository and see them in the tab', async () => {
    renderTest({ url: ROUTE_REPOSITORIES });

    const repositoryCards = await screen.findAllByLabelText(/repository card/i);
    expect(repositoryCards.length).toBeGreaterThan(0);

    // check if STARRED tab is empty
    await userEvent.click(screen.getByRole('tab', { name: /starred/i }));
    expect(await screen.findByText(/no repositories to display./i)).toBeInTheDocument();

    // go back to TRENDING tab
    await userEvent.click(screen.getByRole('tab', { name: /trending/i }));

    // select a repository and add a star
    const button = screen.getAllByRole('button', { name: /toggle star/i });

    await userEvent.click(button[0]);

    // go back to STARRED tab
    await userEvent.click(screen.getByRole('tab', { name: /starred/i }));

    // check if the starred repo is now visible
    expect(screen.getByLabelText(/repository card/i)).toBeInTheDocument();

    // remove the star
    await userEvent.click(screen.getByRole('button', { name: /toggle star/i }));

    expect(screen.getByText(/No repositories to display./i));
  });

  it('should be possible to change the development language', async () => {
    renderTest({ url: ROUTE_REPOSITORIES });

    const repositoryCards = await screen.findAllByLabelText(/repository card/i);
    expect(repositoryCards.length).toBeGreaterThan(0);

    // check if typescript is available as a coding language
    expect(screen.getAllByText(/typescript/i).length).toBe(10);

    // open language combobox
    const languageCombobox = screen.getByRole('combobox', { name: /language/i });
    await userEvent.click(languageCombobox);

    expect(screen.getByRole('option', { name: /go/i })).toBeInTheDocument();
    await userEvent.click(
      screen.getByRole('option', {
        name: /go/i,
      })
    );

    expect(screen.queryAllByText(/typescript/i).length).toBe(0);
    expect(screen.getAllByText('Go').length).toBe(6);
  });

  it('should display a console error if the starred repositories are not wrongly stored in the local storage', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem(LOCAL_STORAGE_KEY, 'not valid json');

    renderTest({ url: ROUTE_REPOSITORIES });

    expect(spy).toHaveBeenCalledWith(
      'Failed to parse starred repos from localStorage',
      expect.any(SyntaxError)
    );
  });

  describe('error modal', () => {
    it('should be rendered if the api doesnt respond', async () => {
      server.use(
        http.get(`${API_ROUTE_REPOSITORY_SEARCH}`, async () => {
          return HttpResponse.json({}, { status: 500 });
        })
      );

      renderTest({ url: ROUTE_REPOSITORIES });

      expect(await screen.findByText(/An unexpected error occurred/i));
      expect(await screen.findByRole('button', { name: /retry/i }));

      server.resetHandlers();

      // test the retry button
      await userEvent.click(screen.getByRole('button', { name: /retry/i }));

      // check if the repositories are rendered
      const repositoryCards = await screen.findAllByLabelText(/repository card/i);
      expect(repositoryCards.length).toBeGreaterThan(0);
    });

    it('should be closable', async () => {
      server.use(
        http.get(`${API_ROUTE_REPOSITORY_SEARCH}`, async () => {
          return HttpResponse.json({}, { status: 500 });
        })
      );

      renderTest({ url: ROUTE_REPOSITORIES });

      expect(await screen.findByText(/An unexpected error occurred/i));
      await userEvent.click(screen.getByRole('button', { name: /Close/i }));
    });
  });
});

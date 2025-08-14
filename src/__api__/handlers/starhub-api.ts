import { http, HttpResponse } from 'msw';

const BASE_URL = import.meta.env.VITE_GITHUB_API_BASE_URL;

export const API_ROUTE_REPOSITORY_SEARCH = `${BASE_URL}/search/repositories`;

export const starhubHandlers = [
  http.get(API_ROUTE_REPOSITORY_SEARCH, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') || '';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const perPage = parseInt(url.searchParams.get('per_page') || '10', 10);

    // Try to extract "language:<value>" from query
    const languageMatch = query.match(/language:([^\s+]+)/);
    const originalLanguage = languageMatch?.[1] || 'TypeScript'; // fallback if no match

    // Build mock repository list
    const items = Array.from({ length: perPage }, (_, i) => {
      const id = (page - 1) * perPage + i + 1;

      // Override every second repo with "Go"
      const language = i % 2 === 1 ? 'Go' : originalLanguage;

      return {
        id,
        name: `repo-${id}`,
        full_name: `mockuser/repo-${id}`,
        description: `This is a mocked repository number ${id} in ${language}`,
        html_url: `https://github.com/mockuser/repo-${id}`,
        stargazers_count: Math.floor(Math.random() * 10000),
        language,
      };
    });

    return HttpResponse.json({
      total_count: 1000,
      incomplete_results: false,
      items,
    });
  }),
];

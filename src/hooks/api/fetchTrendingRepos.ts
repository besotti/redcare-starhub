import { useCreativesApi } from '@hooks/api/useFetchRepositories';
import { IRepository } from '@root/__generated__/github';
import { QueryFunctionContext } from '@tanstack/react-query';

type TrendingReposKey = ['trending-repos', string];

export const fetchTrendingRepos = async (
  ctx: QueryFunctionContext<TrendingReposKey, number>,
  repositoryApiClient: ReturnType<typeof useCreativesApi>
): Promise<IRepository[]> => {
  const [, lang] = ctx.queryKey;
  const page = ctx.pageParam;

  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const dateStr = lastWeek.toISOString().split('T')[0];
  const langQuery = lang !== 'All' ? ` language:"${lang}"` : '';
  const q = `created:>${dateStr}${langQuery}`;

  const response = await repositoryApiClient.searchRepositoriesGet({
    q,
    sort: 'stars',
    order: 'desc',
    page,
    perPage: 10,
  });

  return response.items;
};

import { useCreativesApi } from '@hooks/api/useFetchRepositories';
import { IRepository } from '@root/__generated__/github';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { fetchTrendingRepos } from '../api/fetchTrendingRepos';

type TrendingReposKey = ['trending-repos', string];

export const useInfiniteTrendingRepos = (language: string) => {
  const repositoryApiClient = useCreativesApi();

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    error,
    isError,
  } = useInfiniteQuery<IRepository[], Error, InfiniteData<IRepository[]>, TrendingReposKey, number>(
    {
      queryKey: ['trending-repos', language],
      queryFn: (ctx) => fetchTrendingRepos(ctx, repositoryApiClient),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 10 ? allPages.length + 1 : /* c8 ignore next */ undefined,
      initialPageParam: 1,
    }
  );

  return {
    repos: data?.pages.flat() ?? [],
    loading: isFetching,
    loadingMore: isFetchingNextPage,
    /* c8 ignore next */
    hasMore: hasNextPage ?? false,
    loadNext: fetchNextPage,
    refetch,
    error,
    isError,
  };
};

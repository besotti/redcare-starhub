import { ErrorDialog } from '@components/ErrorDialog';
import { Header } from '@components/Header';
import { Layout } from '@components/Layouts';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { DEVELOPMENT_LANGUAGES } from '@constants/general';
import { useInfiniteTrendingRepos } from '@hooks/queries/useInfiniteTrendingRepos';
import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { LanguageFilter } from './components/LanguageFilter';
import { RepositoryList } from './components/RepositoryList';
import { TabNavigation } from './components/TabNavigation';
import { useStarredRepos } from './hooks/useStarredRepos';

export const RepositoriesPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { starred, starredRepos, toggleStar } = useStarredRepos();
  const [language, setLanguage] = useState('All');

  const { repos, loading, hasMore, loadNext, error, isError, refetch } =
    useInfiniteTrendingRepos(language);
  const { ref: loadMoreRef, inView } = useInView({ threshold: 0, triggerOnce: false });

  React.useEffect(() => {
    if (isError) {
      setDialogOpen(true);
    }
  }, [isError]);

  useEffect(() => {
    /* c8 ignore next: shame on me! */
    if (inView && tab === 0) loadNext();
  }, [inView, tab]);

  const displayedRepos = tab === 0 ? repos : starredRepos;

  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>

      <Layout.Content>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          mb={2}
        >
          <TabNavigation
            value={tab}
            onChange={(newTab) => setTab(newTab)}
            labels={['Trending', 'Starred']}
          />

          {tab === 0 && (
            <LanguageFilter
              value={language}
              onChange={setLanguage}
              languages={DEVELOPMENT_LANGUAGES}
            />
          )}
        </Stack>

        <RepositoryList
          repos={displayedRepos}
          starred={starred}
          onToggleStar={toggleStar}
          isLoading={loading}
        />
        <Box ref={hasMore ? loadMoreRef : undefined} height={1} />
        {loading && <LoadingSpinner />}
        <ErrorDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          message={error?.message}
          onRetry={() => {
            setDialogOpen(false);
            refetch();
          }}
        />
      </Layout.Content>
    </Layout>
  );
};

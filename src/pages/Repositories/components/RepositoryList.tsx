import { IRepository } from '@root/__generated__/github';
import React from 'react';

import { EmptyState } from './EmptyState';
import { RepositoryCard } from './RepositoryCard';

type RepositoryListProps = {
  repos: IRepository[];
  starred: Record<number, IRepository>;
  onToggleStar: (repo: IRepository) => void;
  isLoading: boolean;
};

export const RepositoryList: React.FC<RepositoryListProps> = ({
  repos,
  starred,
  onToggleStar,
  isLoading,
}) => {
  if (repos.length === 0 && !isLoading) {
    return <EmptyState message="No repositories to display." />;
  }

  return (
    <>
      {repos.map((repo) => (
        <RepositoryCard
          key={repo.id}
          repo={repo}
          isStarred={!!starred[repo.id]}
          onToggleStar={onToggleStar}
        />
      ))}
    </>
  );
};

import { LOCAL_STORAGE_KEY } from '@constants/general';
import { IRepository } from '@root/__generated__/github';
import { useCallback, useEffect, useState } from 'react';

type StarredRepoMap = Record<number, IRepository>;

export const useStarredRepos = () => {
  const [starred, setStarred] = useState<StarredRepoMap>({});

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setStarred(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse starred repos from localStorage', e);
      }
    }
  }, []);

  const toggleStar = useCallback((repo: IRepository) => {
    setStarred((prev) => {
      const updated = { ...prev };
      if (updated[repo.id]) {
        delete updated[repo.id];
      } else {
        updated[repo.id] = repo;
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isStarred = useCallback((id: number) => !!starred[id], [starred]);

  const starredRepos = Object.values(starred);

  return { starred, starredRepos, isStarred, toggleStar };
};

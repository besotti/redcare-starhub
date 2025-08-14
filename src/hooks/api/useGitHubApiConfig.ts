import { Configuration } from '@root/__generated__/github';

export const useGitHubApiConfig = () => {
  return new Configuration({
    basePath: `${import.meta.env.VITE_GITHUB_API_BASE_URL}`,
  });
};

import { useGitHubApiConfig } from '@hooks/api/useGitHubApiConfig';
import { DefaultApi } from '@root/__generated__/github';

export const useCreativesApi = () => {
  return new DefaultApi(useGitHubApiConfig());
};

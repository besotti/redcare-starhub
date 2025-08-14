import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
import { IRepository } from '@root/__generated__/github';
import React from 'react';

import { StarToggleButton } from './StarToggleButton';

type RepositoryCardProps = {
  repo: IRepository;
  isStarred: boolean;
  onToggleStar: (repo: IRepository) => void;
};

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repo,
  isStarred,
  onToggleStar,
}) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }} aria-label="Repository Card">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h6">{repo.full_name}</Typography>
            {repo.description && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {repo.description}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              {repo.language}
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">{repo.stargazers_count}</Typography>
            <IconButton
              component="a"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Link"
            >
              <GitHubIcon />
            </IconButton>
            <StarToggleButton
              starred={isStarred}
              onClick={() => {
                onToggleStar(repo);
              }}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

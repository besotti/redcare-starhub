import { Typography } from '@mui/material';
import React from 'react';

export const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <Typography mt={2} color="text.secondary">
    {message}
  </Typography>
);

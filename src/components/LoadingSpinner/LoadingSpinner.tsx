import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <Box mt={2} display="flex" justifyContent="center">
    <CircularProgress />
  </Box>
);

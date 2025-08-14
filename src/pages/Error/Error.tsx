import { Layout } from '@components/Layouts';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Button, Typography } from '@mui/material';
import type React from 'react';
import { useNavigate } from 'react-router';

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Layout.Content>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <ErrorOutlineIcon color="error" style={{ fontSize: 64 }} />
          <Typography variant="h4" gutterBottom mt={2}>
            Something went wrong
          </Typography>

          <Typography variant="body1" color="text.secondary">
            An unexpected error has occurred. Please try again later.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 4 }}
            onClick={() => navigate('/')}
          >
            Go to Homepage
          </Button>
        </Box>
      </Layout.Content>
    </Layout>
  );
};

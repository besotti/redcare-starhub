import { Box, Container } from '@mui/material';
import React from 'react';

type LayoutSlotProps = {
  children: React.ReactNode;
};

const Header: React.FC<LayoutSlotProps> = ({ children }) => (
  <Box component="header">{children}</Box>
);

const Content: React.FC<LayoutSlotProps> = ({ children }) => (
  <Container component="main" sx={{ py: 4 }}>
    {children}
  </Container>
);

type LayoutComponent = React.FC<{ children: React.ReactNode }> & {
  Header: typeof Header;
  Content: typeof Content;
};

export const Layout: LayoutComponent = ({ children }) => {
  return <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>{children}</Box>;
};

Layout.Header = Header;
Layout.Content = Content;

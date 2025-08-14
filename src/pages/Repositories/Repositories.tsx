import type React from 'react';

import { Header } from '../../components/Header/Header.tsx';
import { Layout } from '../../components/Layouts';

export const RepositoriesPage: React.FC = () => {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>Display Repositories</Layout.Content>
    </Layout>
  );
};

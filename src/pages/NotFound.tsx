import React from 'react';

import ConNotFound from 'containers/NotFound';
import EmptyLayout from 'components/EmptyLayout';
import MainLayout from 'components/MainLayout';
import { isAuthenticated } from 'helpers';

const PageNotFound = () =>
  isAuthenticated() ? (
    <MainLayout>
      <ConNotFound />
    </MainLayout>
  ) : (
    <EmptyLayout>
      <ConNotFound />
    </EmptyLayout>
  );

export default PageNotFound;

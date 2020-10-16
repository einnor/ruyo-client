import React from 'react';

import ConNotFound from '../containers/NotFound';
import EmptyLayout from '../components/EmptyLayout';
import { isAuthenticated } from '../helpers';

const PageNotFound = () =>
  isAuthenticated() ? null : ( // TODO Add another layout
    <EmptyLayout>
      <ConNotFound />
    </EmptyLayout>
  );

export default PageNotFound;

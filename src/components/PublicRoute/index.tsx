import React, { ElementType, FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../../helpers';

interface IProps {
  component: ElementType;
  path: string;
  exact?: boolean;
}

const PublicRoute: FunctionComponent<IProps> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Redirect
          to={{
            pathname: '/orders',
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default PublicRoute;

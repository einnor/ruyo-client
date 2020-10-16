import React, { FunctionComponent, ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../../helpers';

interface IProps {
  component: ElementType;
  path: string;
  exact?: boolean;
}

const PrivateRoute: FunctionComponent<IProps> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
          }}
        />
      )
    }
  />
);

export default PrivateRoute;

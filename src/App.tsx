import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import LoadingIndicator from './components/LoadingIndicator';

// const SignInPage = lazy(() => import('./pages/SignIn'));
const OrdersPage = lazy(() => import('./pages/Orders'));
// const OrderPage = lazy(() => import('./pages/Order'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));

const App = () => (
  <Router>
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
          }}
        >
          <LoadingIndicator size="large" />
        </div>
      }
    >
      <Switch>
        {/* <PublicRoute exact path="/sign-in" component={SignInPage} /> */}
        <PublicRoute exact path="/" component={OrdersPage} />
        <PrivateRoute exact path="/orders" component={OrdersPage} />
        {/* <PrivateRoute
          exact
          path="/orders/:id"
          component={OrderPage}
        /> */}
        <Route
          path="*"
          render={(props) => {
            const url = props.match.url;
            const regex = /\/\/+/g;
            if (url.match(regex)) {
              const cleanUrl = url.replace(regex, '/');
              return <Redirect to={cleanUrl} />;
            } else {
              return <NotFoundPage />;
            }
          }}
        />
      </Switch>
    </Suspense>
  </Router>
);

export default App;

import React, { Fragment, useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import SignInForm from './SignInForm';
import showAlert from 'components/Alert';
import IGlobalState, { APIError } from 'types';
import * as selectors from './store/authentication.selectors';
import { signInRequest, getUserRequest } from './store/authentication.actions';
import { User } from './store/authentication.types';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.contrastText,
    height: 'calc(100vh - 150px)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: theme.spacing(2),
  },
}));

interface IProps {
  isFetching: boolean;
  uid: string | null;
  data: User | null;
  error: APIError | null;
  signInRequest: (email: string, password: string) => void;
  getUserRequest: (uid: string) => void;
}

const Authentication = ({
  history,
  signInRequest,
  getUserRequest,
  isFetching,
  uid,
  data,
  error,
}: IProps & RouteComponentProps) => {
  const classes = useStyles();

  const onSignIn = (email: string, password: string) => {
    signInRequest(email, password);
  };

  const onGetUser = (uid: string) => {
    getUserRequest(uid);
  };

  const redirectTo = (path: string) => {
    history.push(path);
  };

  if (error) {
    return showAlert({
      variant: 'error',
      message: error.message || 'Oops! Something went wrong.',
    });
  }

  return (
    <Fragment>
      <div className={classes.root}>
        <Paper className={classes.form}>
          <SignInForm onSubmit={onSignIn} isLoading={isFetching} />
        </Paper>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: selectors.getIsFetching(state),
  uid: selectors.getUID(state),
  data: selectors.getData(state),
  error: selectors.getError(state),
});

const mapDispatchToProps = {
  signInRequest,
  getUserRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Authentication));

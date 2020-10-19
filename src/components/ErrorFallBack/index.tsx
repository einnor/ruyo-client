import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Typography, Container, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ScreenErrorBoundary } from 'i18n/en';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'transparent',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
  title: {
    color: theme.palette.primary.main,
  },
  description: {
    letterSpacing: 1.8,
    fontWeight: 300,
  },
  buttonWrapper: {
    marginTop: theme.spacing(4),
    width: '100%',
  },
}));

const ErrorFallback = ({ history }: RouteComponentProps) => {
  const classes = useStyles();

  const redirectTo = (path: string) => {
    history.push(path);
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography
        variant="h1"
        align="center"
        className={classes.title}
        gutterBottom
      >
        {ScreenErrorBoundary.TITLE}
      </Typography>
      <Typography
        variant="h5"
        align="center"
        className={classes.description}
        color="textSecondary"
        gutterBottom
      >
        {ScreenErrorBoundary.DESCRIPTION}
      </Typography>
      <div className={classes.buttonWrapper}>
        <Button
          variant="outlined"
          size="large"
          color="primary"
          fullWidth
          onClick={() => redirectTo('/')}
        >
          {ScreenErrorBoundary.GO_BACK_HOME}
        </Button>
      </div>
    </Container>
  );
};

export default withRouter(ErrorFallback);

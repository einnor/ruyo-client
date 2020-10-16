import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Typography, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ScreenNotFound } from '../../i18n/en';

const useStyles = makeStyles((theme) => ({
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

const Con404 = ({ history }: RouteComponentProps) => {
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
        {ScreenNotFound.TITLE}
      </Typography>
      <Typography
        variant="h5"
        align="center"
        className={classes.description}
        color="textSecondary"
        gutterBottom
      >
        {ScreenNotFound.DESCRIPTION}
      </Typography>
      <div className={classes.buttonWrapper}>
        <Button
          variant="outlined"
          size="large"
          color="primary"
          fullWidth
          onClick={() => redirectTo('/orders')}
        >
          {ScreenNotFound.GO_BACK_HOME}
        </Button>
      </div>
    </Container>
  );
};

export default withRouter(Con404);

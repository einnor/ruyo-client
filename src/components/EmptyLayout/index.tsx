import React, { FunctionComponent, ReactElement } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

interface IProps {
  children: ReactElement;
}

const PlainLayout: FunctionComponent = ({ children }: IProps) => {
  const classes = useStyles();
  return <Container className={classes.root}>{children}</Container>;
};

export default PlainLayout;

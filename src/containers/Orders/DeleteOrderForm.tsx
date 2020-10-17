import React from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { ScreenOrders } from 'i18n/en';
import { IOrder } from 'types';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  appBar: {
    backgroundColor: theme.palette.primary.contrastText,
    margin: '-16px 0 20px -20px',
    width: 'calc(100% + 36px)',
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: theme.spacing(2.5),
  },
  buttonWrapper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'left',
  },
}));

interface IProps {
  onSubmit: (id: string) => void;
  isLoading: boolean;
  id: string;
  onToggleDrawer?: () => void;
  order: IOrder;
}

const DeleteOrderForm = ({
  id,
  onSubmit,
  isLoading = false,
  onToggleDrawer = () => {},
  order,
}: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        variant="outlined"
        className={classes.appBar}
      >
        <Toolbar
          className="toolbar"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant="h6">{ScreenOrders.DELETE_TITLE}</Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onToggleDrawer}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Typography variant="body2" align="left" color="textPrimary">
        {ScreenOrders.DELETE_DESCRIPTION}
        &nbsp; ({order.title})
      </Typography>
      <div className={classes.buttonWrapper}>
        <Button
          type="button"
          variant="contained"
          onClick={() => onSubmit(id)}
          disabled={isLoading}
          color="secondary"
          size="large"
        >
          {ScreenOrders.DELETE_BUTTON_LABEL}
        </Button>
      </div>
    </div>
  );
};

export default DeleteOrderForm;

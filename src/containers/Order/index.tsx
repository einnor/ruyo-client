import React, { Fragment, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {
  CreateOutlined,
  PersonOutline,
  TodayOutlined,
  RoomOutlined,
} from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import LoadingIndicator from 'components/LoadingIndicator';
import showAlert from 'components/Alert';
import IGlobalState, { APIError } from 'types';
import * as selectors from '../Orders/store/orders.selectors';
import { getOrderRequest } from '../Orders/store/orders.actions';
import { Order as IOrder } from '../Orders/store/orders.types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        margin: theme.spacing(1),
      },
      backgroundColor: theme.palette.primary.contrastText,
      height: '100%',
      minWidth: '100%',
      paddingTop: theme.spacing(8),
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
      overflowY: 'scroll',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0),
        height: '100%',
      },
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    multiLineLabelWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      justifyContent: 'center',
    },
    label: {
      fontSize: theme.spacing(1.75),
    },
    loadingWrapper: {
      position: 'relative',
      backgroundColor: 'transparent',
      height: 'calc(100vh - 150px)',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

interface IProps {
  isFetching: boolean;
  data: IOrder[];
  error: APIError | null;
  getOrderRequest: (id: string) => void;
  match: {
    params: {
      id: string;
    };
  };
}

const Order = ({
  history,
  getOrderRequest,
  isFetching,
  data,
  error,
  match,
}: IProps & RouteComponentProps) => {
  const classes = useStyles();
  const id = match.params.id;

  useEffect(() => {
    if (id) {
      getOrderRequest(id);
    }
  }, [getOrderRequest, id]);

  if (isFetching) {
    return (
      <div className={classes.loadingWrapper}>
        <LoadingIndicator />
      </div>
    );
  }

  const order = data.find((item) => item.id === id);

  if (!order) {
    return (
      <div className={classes.loadingWrapper}>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Order does not exist!
        </Typography>
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          {order.title}
        </Typography>
        <List className={classes.list}>
          <ListItem>
            <ListItemIcon>
              <CreateOutlined />
            </ListItemIcon>
            <ListItemText
              primary={<span className={classes.label}>[{order.title}]</span>}
              secondary="Title"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TodayOutlined />
            </ListItemIcon>
            <ListItemText
              primary={
                <span className={classes.label}>
                  [{moment(order.bookingDate).format('DD.MM.YYYY')}]
                </span>
              }
              secondary="Booking Date"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <RoomOutlined />
            </ListItemIcon>
            <ListItemText
              primary={
                <div className={classes.multiLineLabelWrapper}>
                  {order.address ? (
                    <Fragment>
                      <span className={classes.label}>
                        {order.address.street}
                      </span>
                      <span className={classes.label}>
                        {order.address.city} {order.address.zip}
                      </span>
                      <span className={classes.label}>
                        {order.address.country}
                      </span>
                    </Fragment>
                  ) : null}
                </div>
              }
              secondary="Address"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PersonOutline />
            </ListItemIcon>
            <ListItemText
              primary={
                <div className={classes.multiLineLabelWrapper}>
                  {order.customer ? (
                    <Fragment>
                      <span className={classes.label}>
                        {order.customer.name}
                      </span>
                      <span className={classes.label}>
                        {order.customer.email}
                      </span>
                      <span className={classes.label}>
                        {order.customer.phone}
                      </span>
                    </Fragment>
                  ) : null}
                </div>
              }
              secondary="Customer"
            />
          </ListItem>
        </List>
        {error &&
          showAlert({
            variant: 'error',
            message: error.message || 'Oops! Something went wrong.',
          })}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: selectors.getIsFetching(state),
  data: selectors.getData(state),
  error: selectors.getError(state),
});

const mapDispatchToProps = {
  getOrderRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));

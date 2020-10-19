import React, { Fragment, useState, useEffect } from 'react';
import { Typography, Grid, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import OrderForm from './OrderForm';
import OrderDeleteForm from './DeleteOrderForm';
import TabularListing from 'components/TabularListing';
import LoadingIndicator from 'components/LoadingIndicator';
import { ScreenOrders } from 'i18n/en';
import showAlert from 'components/Alert';
import IGlobalState, { APIError } from 'types';
import * as selectors from './store/orders.selectors';
import { getOrdersRequest, updateOrderRequest } from './store/orders.actions';
import { Order } from './store/orders.types';

const useStyles = makeStyles((theme) => ({
  root: {
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
  main: {
    margin: theme.spacing(0),
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
}));

const DRAWER_COMPONENT = {
  ADD_OR_EDIT: 'addOrEdit',
  DELETE: 'delete',
};

interface IProps {
  isFetching: boolean;
  data: Order[];
  error: APIError | null;
  getOrdersRequest: () => void;
  updateOrderRequest: (id: string, order: Order) => void;
}

const Orders = ({
  history,
  getOrdersRequest,
  updateOrderRequest,
  isFetching,
  data,
  error,
}: IProps & RouteComponentProps) => {
  const classes = useStyles();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerComponent, setDrawerComponent] = useState<string | null>(null);

  useEffect(() => {
    getOrdersRequest();
  }, [getOrdersRequest]);

  const onToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setSelectedOrderId(null);
    setDrawerComponent(null);
  };

  // const onAddOrder = () => {
  //   setIsDrawerOpen(true);
  //   setDrawerComponent('addOrEdit');
  // };

  const onEditOrder = (id: string) => {
    setSelectedOrderId(id);
    setDrawerComponent('addOrEdit');
    setIsDrawerOpen(true);
  };

  const onDeleteOrder = (id: string) => {
    setSelectedOrderId(id);
    setDrawerComponent('delete');
    setIsDrawerOpen(true);
  };

  const onUpdateOrder = (id: string, payload: Order) => {
    updateOrderRequest(id, payload);
  };

  const onDeleteOrderConfirm = (id: string) => {
    // TODO
  };

  const redirectTo = (path: string) => {
    history.push(path);
  };

  const onViewOrder = (id: string) => redirectTo(`/orders/${id}`);

  const onCreateOrder = (payload: Order) => {
    // TODO
  };

  const headers = ['id', 'title', 'bookingDate', 'address', 'customer'];
  const rows = data.map((order) => {
    const formattedOrder = {
      id: order.id,
      title: order.title,
      bookingDate: moment(order.bookingDate).format('DD.MM.YYYY'),
      address: order.address ? order.address.street : null,
      customer: order.customer ? order.customer.name : null,
    };
    return Object.entries(formattedOrder);
  });

  if (isFetching && !isDrawerOpen) {
    return (
      <div className={classes.loadingWrapper}>
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          {ScreenOrders.TITLE}
        </Typography>
        <Grid container spacing={3} className={classes.main}>
          <Grid item xs={12} sm={12} md={8}>
            <TabularListing
              title={ScreenOrders.TITLE}
              rows={rows}
              headers={headers}
              actions={['view', 'edit']}
              addResourceLabel={ScreenOrders.CREATE_BUTTON_LABEL}
              // addResourceCallback={onAddOrder}
              onView={onViewOrder}
              onEdit={onEditOrder}
              onDelete={onDeleteOrder}
              showMoreCallback={() => {}}
            />
          </Grid>
        </Grid>
        {error &&
          showAlert({
            variant: 'error',
            message: error.message || 'Oops! Something went wrong.',
          })}
      </div>
      <Drawer
        open={isDrawerOpen}
        anchor="right"
        onClose={onToggleDrawer}
        className="drawer"
      >
        <div style={{ maxWidth: 450 }}>
          {selectedOrderId && drawerComponent === DRAWER_COMPONENT.DELETE ? (
            <OrderDeleteForm
              id={selectedOrderId}
              onSubmit={onDeleteOrderConfirm}
              isLoading={isFetching}
              order={data.find((order) => order.id === selectedOrderId)}
              onToggleDrawer={onToggleDrawer}
            />
          ) : drawerComponent === DRAWER_COMPONENT.ADD_OR_EDIT ? (
            <OrderForm
              id={selectedOrderId}
              order={
                selectedOrderId
                  ? data.find((order) => order.id === selectedOrderId)
                  : undefined
              }
              onSave={onCreateOrder}
              onUpdate={onUpdateOrder}
              isLoading={isFetching}
              onToggleDrawer={onToggleDrawer}
            />
          ) : null}
        </div>
      </Drawer>
    </Fragment>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: selectors.getIsFetching(state),
  data: selectors.getData(state),
  error: selectors.getError(state),
});

const mapDispatchToProps = {
  getOrdersRequest,
  updateOrderRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders));

import React, { Fragment, useState } from 'react';
import { Typography, Grid, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import OrderForm from './OrderForm';
import OrderDeleteForm from './DeleteOrderForm';
import TabularListing from 'components/TabularListing';
import LoadingIndicator from 'components/LoadingIndicator';
import { ScreenOrders } from 'i18n/en';
import showAlert from 'components/Alert';
import { IOrder } from 'types';

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
  toolbar: {
    justifyContent: 'space-between',
  },
  logo: {
    width: theme.spacing(25),
  },
  whiteColor: {
    color: theme.palette.primary.contrastText,
  },
  toolBar: {
    width: '100%',
  },
  menuWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  list: {
    width: 250,
  },
  main: {
    margin: theme.spacing(0),
  },
}));

const DRAWER_COMPONENT = {
  ADD_OR_EDIT: 'addOrEdit',
  DELETE: 'delete',
};

const Orders = ({ history }: RouteComponentProps) => {
  const classes = useStyles();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerComponent, setDrawerComponent] = useState<string | null>(null);

  const onToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setSelectedOrderId(null);
    setDrawerComponent(null);
  };

  const onAddOrder = () => {
    setIsDrawerOpen(true);
    setDrawerComponent('addOrEdit');
  };

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

  const onUpdateOrder = (id: string, payload: IOrder) => {
    // TODO
    // return showAlert({
    //   message: 'Order has been successfully updated',
    //   variant: 'success',
    // });
  };

  const onDeleteOrderConfirm = (id: string) => {
    // TODO
    // return showAlert({
    //   message: 'Order has been successfully deleted',
    //   variant: 'success',
    // });
  };

  const redirectTo = (path: string) => {
    history.push(path);
  };

  const onViewOrder = (id: string) => redirectTo(`/orders/${id}`);

  const onCreateOrder = (payload: IOrder) => {
    // TODO
    // return showAlert({
    //   message: 'Order has been successfully created',
    //   variant: 'success',
    // });
  };

  const headers = ['id', 'title', 'bookingDate', 'address', 'customer'];
  const data: IOrder[] = [
    {
      id: '1',
      title: 'Test',
      bookingDate: '12/12/2020',
      address: '86-10300, Kerugoya',
      customer: 'John Doe',
    },
  ];
  const rows = data.map((order) => Object.entries(order));

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
              actions={['view', 'edit', 'delete']}
              addResourceLabel={ScreenOrders.CREATE_BUTTON_LABEL}
              addResourceCallback={onAddOrder}
              onView={onViewOrder}
              onEdit={onEditOrder}
              onDelete={onDeleteOrder}
              showMoreCallback={() => {}}
            />
          </Grid>
        </Grid>
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
              isLoading={true}
              order={data[0]}
              onToggleDrawer={onToggleDrawer}
            />
          ) : drawerComponent === DRAWER_COMPONENT.ADD_OR_EDIT ? (
            <OrderForm
              id={selectedOrderId}
              order={selectedOrderId ? data[0] : undefined}
              onSave={onCreateOrder}
              onUpdate={onUpdateOrder}
              isLoading={true}
              onToggleDrawer={onToggleDrawer}
            />
          ) : null}
        </div>
      </Drawer>
    </Fragment>
  );
};

export default withRouter(Orders);

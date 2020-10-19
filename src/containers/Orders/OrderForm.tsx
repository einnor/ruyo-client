import React, { useState } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import Formsy, { addValidationRule } from 'formsy-react';
import TextInput from 'components/FormsyElements/InputTypes/Text';
import DatePickerInput from 'components/FormsyElements/InputTypes/DatePicker';
import { isRequired } from 'components/FormsyElements/CustomValidationRules';
import { ScreenOrders } from 'i18n/en';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Order } from 'containers/Orders/store/orders.types';

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
  formField: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  buttonWrapper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'left',
  },
}));

addValidationRule('isRequired', isRequired);

interface IProps {
  id?: string | null;
  order?: Order;
  onSave: (payload: any) => void;
  onUpdate?: (id: string, payload: Order) => void;
  isLoading: boolean;
  onToggleDrawer?: () => void;
}

const OrderForm = ({
  id,
  order,
  onSave,
  onUpdate,
  isLoading = false,
  onToggleDrawer = () => {},
}: IProps) => {
  const classes = useStyles();
  const [state, setState] = useState<{
    form: Order;
    isFormValid: boolean;
  }>({
    form: {
      title: order ? order.title : '',
      bookingDate: order ? order.bookingDate : Date.now(),
      address:
        order && order.address
          ? order.address
          : {
              city: '',
              zip: '',
              street: '',
              country: '',
            },
      customer:
        order && order.customer
          ? order.customer
          : {
              email: '',
              phone: '',
              name: '',
            },
    },
    isFormValid: false,
  });

  const { form, isFormValid } = state;
  const { title, bookingDate, address, customer } = form;

  const onChange = (name: string, value: string | number) => {
    const { form } = state;
    const nameArray = name.split('.');
    if (nameArray.length === 2) {
      setState({
        ...state,
        form: {
          ...form,
          [nameArray[0]]: { ...form[nameArray[0]], [nameArray[1]]: value },
        },
      });
    } else {
      setState({ ...state, form: { ...form, [name]: value } });
    }
  };

  const onDateChange = (name: string, value: MaterialUiPickersDate) => {
    const { form } = state;
    setState({ ...state, form: { ...form, bookingDate: value.unix() } });
  };

  const onInvalid = () => {
    setState({ ...state, isFormValid: false });
  };

  const onValid = () => {
    setState({ ...state, isFormValid: true });
  };

  const onValidSubmit = (model: Order) => {
    model.bookingDate = moment(model.bookingDate).unix();
    if (id && onUpdate) {
      return onUpdate(id, model);
    }
    onSave(model);
  };

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
          <Typography variant="h6">
            {id ? ScreenOrders.EDIT_TITLE : ScreenOrders.ADD_TITLE}
          </Typography>
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
      <Formsy
        onValidSubmit={onValidSubmit}
        onValid={onValid}
        onInvalid={onInvalid}
      >
        <TextInput
          name="title"
          type="text"
          onChange={onChange}
          label="Title*"
          value={title}
          validations={{ isRequired: true }}
          validationErrors={{
            isRequired: 'Title is required',
          }}
          className={classes.formField}
        />
        <DatePickerInput
          name="bookingDate"
          label="Booking Date*"
          onChange={onDateChange}
          validations={{ isRequired: true }}
          validationErrors={{ isRequired: 'This field is required' }}
          value={moment.unix(bookingDate).format('YYYY-MM-DD')}
          className={classes.formField}
        />
        <TextInput
          name="address.street"
          type="text"
          onChange={onChange}
          label="Street*"
          value={address.street}
          disabled={id ? true : false}
          validations={{ isRequired: true }}
          validationErrors={{ isRequired: 'This field is required' }}
          className={classes.formField}
        />
        <TextInput
          name="address.city"
          type="text"
          onChange={onChange}
          label="City*"
          value={address.city}
          disabled={id ? true : false}
          validations={{ isRequired: true }}
          validationErrors={{ isRequired: 'This field is required' }}
          className={classes.formField}
        />
        <TextInput
          name="address.country"
          type="text"
          onChange={onChange}
          label="Country*"
          value={address.country}
          disabled={id ? true : false}
          validations={{ isRequired: true }}
          validationErrors={{ isRequired: 'This field is required' }}
          className={classes.formField}
        />
        <TextInput
          name="address.zip"
          type="text"
          onChange={onChange}
          label="Zip Code*"
          value={address.zip}
          disabled={id ? true : false}
          validations={{ isRequired: true }}
          validationErrors={{ isRequired: 'This field is required' }}
          className={classes.formField}
        />
        <TextInput
          name="customer.name"
          type="text"
          onChange={onChange}
          label="Name*"
          value={customer.name}
          disabled={id ? true : false}
          validations={{ isRequired: true }}
          validationErrors={{ isRequired: 'This field is required' }}
          className={classes.formField}
        />
        <TextInput
          name="customer.email"
          type="email"
          onChange={onChange}
          label="E-mail*"
          value={customer.email}
          disabled={id ? true : false}
          validations={{ isRequired: true }}
          validationErrors={{ isRequired: 'This field is required' }}
          className={classes.formField}
        />
        <TextInput
          name="customer.phone"
          type="tel"
          onChange={onChange}
          label="Phone*"
          value={customer.phone}
          disabled={id ? true : false}
          validations={{ isRequired: true }}
          validationErrors={{ isRequired: 'This field is required' }}
          className={classes.formField}
        />
        <div className={classes.buttonWrapper}>
          <Button
            type="submit"
            variant="outlined"
            disabled={!isFormValid || isLoading}
            color="primary"
            size="large"
          >
            {id
              ? ScreenOrders.EDIT_BUTTON_LABEL
              : ScreenOrders.CREATE_BUTTON_LABEL}
          </Button>
        </div>
      </Formsy>
    </div>
  );
};

export default OrderForm;

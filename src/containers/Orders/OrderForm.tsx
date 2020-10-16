import React, { Fragment, useState } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import Formsy, { addValidationRule } from 'formsy-react';
import TextInput from 'components/FormsyElements/InputTypes/Text';
import DatePickerInput from 'components/FormsyElements/InputTypes/DatePicker';
import { isRequired } from 'components/FormsyElements/CustomValidationRules';
import { IOrder } from 'types';
import { ScreenOrders } from 'i18n/en';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  appBar: {
    backgroundColor: theme.palette.primary.contrastText,
    margin: '-16px 0 20px -20px',
    width: 'calc(100% + 40px)',
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: theme.spacing(2.5),
  },
  formField: {
    marginBottom: theme.spacing(2),
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
  order?: IOrder;
  onSave: (payload: any) => void;
  onUpdate?: (id: string, payload: IOrder) => void;
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
    form: IOrder;
    isFormValid: boolean;
  }>({
    form: {
      title: order ? order.title! : '',
      bookingDate: order ? order.bookingDate! : '',
      address: order ? order.bookingDate! : '',
      customer: order ? order.bookingDate! : '',
    },
    isFormValid: false,
  });

  const { form, isFormValid } = state;
  const { title, bookingDate, address, customer } = form;

  const onChange = (
    name: string,
    value: string | number | MaterialUiPickersDate,
  ) => {
    const { form } = state;
    setState({ ...state, form: { ...form, [name]: value } });
  };

  const onInvalid = () => {
    setState({ ...state, isFormValid: false });
  };

  const onValid = () => {
    setState({ ...state, isFormValid: true });
  };

  const onValidSubmit = (model: IOrder) => {
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
          value={title!}
          validations={{ isRequired: true }}
          validationErrors={{
            isRequired: 'Title is required',
          }}
          className={classes.formField}
        />
        <DatePickerInput
          name="bookingDate"
          label="Booking Date*"
          onChange={onChange}
          validations={{ isRequired: true }}
          validationErrors={{ isRequired: 'This field is required' }}
          value={bookingDate}
          className={classes.formField}
        />
        <TextInput
          name="address"
          type="text"
          onChange={onChange}
          label="Address*"
          value={address!}
          validations={{ isRequired: true }}
          validationErrors={{ isRequired: 'This field is required' }}
          className={classes.formField}
        />
        <TextInput
          name="customer"
          type="text"
          onChange={onChange}
          label="Customer*"
          value={customer}
          validations={{ isRequired: true }}
          validationErrors={{ isRequired: 'This field is required' }}
          className={classes.formField}
        />
        <div className={classes.buttonWrapper}>
          <Button
            variant="outlined"
            disabled={!isFormValid || isLoading}
            color="primary"
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

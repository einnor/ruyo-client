import 'date-fns';
import React, { Fragment } from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { withFormsy } from 'formsy-react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { FormControl, FormHelperText } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface IProps {
  name: string;
  label?: string;
  value?: string;
  className?: string;
  isPristine?: boolean;
  isValid?: string;
  onChange?: (name: string, date: MaterialUiPickersDate) => void;
}

const DatePicker = ({
  name,
  label = 'Date picker dialog',
  value,
  className,
  isPristine,
  isValid,
  onChange,
}: IProps) => {
  const [selectedDate, setSelectedDate] = React.useState<MaterialUiPickersDate>(
    value ? moment(value) : moment(),
  );

  const handleDateChange = (date: MaterialUiPickersDate) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(name, date);
    }
  };

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          margin="normal"
          animateYearScrolling
          error={!isPristine && !isValid}
          label={label}
          variant="inline"
          inputVariant="outlined"
          format="dddd, MMMM Do YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          showTodayButton
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          className={className}
          fullWidth
        />
      </MuiPickersUtilsProvider>
      {!isPristine && !isValid ? (
        <FormHelperText error={!isPristine && !isValid}>
          {isPristine ? null : 'Error'}
        </FormHelperText>
      ) : null}
    </Fragment>
  );
};

export default withFormsy(DatePicker);

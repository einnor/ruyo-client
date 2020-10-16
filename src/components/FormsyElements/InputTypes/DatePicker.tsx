import 'date-fns';
import React from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { withFormsy } from 'formsy-react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { format } from 'date-fns';

interface IProps {
  name: string;
  label?: string;
  value?: string;
  className?: string;
  onChange?: (name: string, date: MaterialUiPickersDate) => void;
}

const DatePicker = ({
  name,
  label = 'Date picker dialog',
  value,
  className,
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
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        margin="normal"
        label={label}
        variant="inline"
        inputVariant="outlined"
        format="dddd, MMMM Do YYYY"
        value={selectedDate}
        onChange={handleDateChange}
        showTodayButton={true}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        className={className}
        fullWidth
      />
    </MuiPickersUtilsProvider>
  );
};

export default withFormsy(DatePicker);

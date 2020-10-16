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

interface IProps {
  label?: string;
}

const DatePicker = ({ label = 'Date picker dialog' }: IProps) => {
  const [selectedDate, setSelectedDate] = React.useState<MaterialUiPickersDate>(
    moment(),
  );

  const handleDateChange = (date: MaterialUiPickersDate) => {
    setSelectedDate(date);
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
        fullWidth
      />
    </MuiPickersUtilsProvider>
  );
};

export default withFormsy(DatePicker);

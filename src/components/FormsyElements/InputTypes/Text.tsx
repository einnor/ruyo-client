import React, { FunctionComponent } from 'react';
import { TextField } from '@material-ui/core';
import { withFormsy, FormsyInjectedProps } from 'formsy-react';

type InputValueType = string | number;

interface Props extends FormsyInjectedProps<InputValueType> {
  value: string;
  onChange: (name: string, value: string) => void;
  label: string;
  setValue: (value: string | number) => void;
  isValid: boolean;
  isValidValue: (value: string | number) => boolean;
  isPristine: boolean;
  name: string;
  type: string;
  multiline?: boolean;
  rowsMax?: number;
  rows?: number;
  className?: string;
  placeholder?: string;
  errorMessage: string;
  disabled?: boolean;
}

const TextInput: FunctionComponent<Props> = ({
  name,
  label,
  type,
  onChange,
  multiline,
  rows,
  rowsMax,
  value,
  setValue,
  errorMessage,
  isValid,
  isPristine,
  className,
  placeholder,
  disabled = false,
}) => {
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
    setValue(event.target.value);
  };

  return (
    <TextField
      error={!isPristine && !isValid}
      name={name}
      type={type || 'text'}
      value={value}
      label={label}
      variant="outlined"
      multiline={multiline}
      rows={rows || 1}
      rowsMax={rowsMax || 1}
      onChange={changeValue}
      helperText={isPristine ? null : errorMessage}
      className={className}
      placeholder={placeholder || ''}
      disabled={disabled}
    />
  );
};

export default withFormsy(TextInput);

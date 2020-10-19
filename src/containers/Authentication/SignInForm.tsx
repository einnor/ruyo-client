import React, { useState } from 'react';
import { Typography, AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Formsy, { addValidationRule } from 'formsy-react';
import TextInput from 'components/FormsyElements/InputTypes/Text';
import { isRequired } from 'components/FormsyElements/CustomValidationRules';
import { ScreenSignIn } from 'i18n/en';

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
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
}

interface SignInForm {
  email: string;
  password: string;
}

const SignInForm = ({ onSubmit, isLoading = false }: IProps) => {
  const classes = useStyles();
  const [state, setState] = useState<{
    form: SignInForm;
    isFormValid: boolean;
  }>({
    form: {
      email: '',
      password: '',
    },
    isFormValid: false,
  });

  const { form, isFormValid } = state;
  const { email, password } = form;

  const onChange = (name: string, value: string | number) => {
    const { form } = state;
    setState({ ...state, form: { ...form, [name]: value } });
  };

  const onInvalid = () => {
    setState({ ...state, isFormValid: false });
  };

  const onValid = () => {
    setState({ ...state, isFormValid: true });
  };

  const onValidSubmit = (model: SignInForm) => {
    const { email, password } = model;
    onSubmit(email, password);
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
          <Typography variant="h6">{ScreenSignIn.TITLE}</Typography>
        </Toolbar>
      </AppBar>
      <Formsy
        onValidSubmit={onValidSubmit}
        onValid={onValid}
        onInvalid={onInvalid}
      >
        <TextInput
          name="email"
          type="email"
          onChange={onChange}
          label="E-mail*"
          value={email}
          validations={{ isRequired: true }}
          validationErrors={{
            isRequired: 'E-mail is required',
          }}
          className={classes.formField}
        />
        <TextInput
          name="password"
          type="password"
          onChange={onChange}
          label="Password*"
          value={password}
          validations={{ isRequired: true }}
          validationErrors={{ isRequired: 'Password is required' }}
          className={classes.formField}
        />
        <div className={classes.buttonWrapper}>
          <Button
            type="submit"
            variant="outlined"
            disabled={!isFormValid || isLoading}
            color="primary"
            size="large"
            fullWidth
          >
            {ScreenSignIn.SIGN_IN_BUTTON_LABEL}
          </Button>
        </div>
      </Formsy>
    </div>
  );
};

export default SignInForm;

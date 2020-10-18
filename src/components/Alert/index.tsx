import React, { Fragment } from 'react';
import { VariantType, useSnackbar } from 'notistack';

interface IProps {
  message: string;
  variant: VariantType;
}

const showAlert = ({ message, variant }: IProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { enqueueSnackbar } = useSnackbar();

  return <Fragment>{enqueueSnackbar(message, { variant })}</Fragment>;
};

export default showAlert;

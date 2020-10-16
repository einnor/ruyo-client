import { VariantType, useSnackbar } from 'notistack';

interface IProps {
  message: string;
  variant: VariantType;
}

const showAlert = ({ message, variant }: IProps) => {
  const { enqueueSnackbar } = useSnackbar();

  return enqueueSnackbar(message, { variant });
};

export default showAlert;

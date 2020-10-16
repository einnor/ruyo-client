import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: blue,
      secondary: red,
    },
  }),
);

export default theme;

import { createTheme, SxProps, Theme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#d34d00',
    },
  },
});

export type Styles = SxProps<Theme>;

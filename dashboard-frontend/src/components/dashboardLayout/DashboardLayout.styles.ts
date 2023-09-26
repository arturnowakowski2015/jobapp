import { SxProps, Theme } from '@mui/material';

import { theme } from 'theme/theme';

export const drawerWidth = 300;
export const topBarHeight = 100;

export const outerContainer: SxProps<Theme> = {
  display: 'flex',
  columnGap: 5,
  minHeight: '100vh',
  backgroundColor: theme.palette.grey[200],
};

export const contentWrapper: SxProps<Theme> = {
  flexGrow: 1,
  paddingTop: `${topBarHeight}px`,
  paddingRight: 3,
};

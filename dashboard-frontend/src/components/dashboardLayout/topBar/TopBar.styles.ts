import { SxProps, Theme } from '@mui/material';

import { theme } from 'theme/theme';

export const topBar: SxProps<Theme> = {
  position: 'fixed',
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: 'none',
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
};

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const smallAvatar: SxProps<Theme> = {
  width: '24px',
  height: '24px',
  fontSize: '14px',
};

export const menuItem: SxProps<Theme> = {
  paddingY: 1.5,
};

export const usernameMenuItem: SxProps<Theme> = {
  ...menuItem,
  pointerEvents: 'none',

  '&.Mui-disabled': {
    opacity: 1,
  },
};

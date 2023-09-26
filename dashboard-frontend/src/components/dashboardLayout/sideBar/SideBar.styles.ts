import { SxProps, Theme } from '@mui/material';

import { theme } from 'theme/theme';

import { drawerWidth, topBarHeight } from '../DashboardLayout.styles';

export const sideBar: SxProps<Theme> = {
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    paddingTop: `${topBarHeight}px`,
    border: 'none',
    width: drawerWidth,
    background: theme.palette.grey[200],
    boxSizing: 'border-box',
  },
};

export const contentWrapper: SxProps<Theme> = {
  flexGrow: 1,
  paddingTop: `${topBarHeight}px`,
};

export const menuList: SxProps<Theme> = {
  padding: 0,
  paddingRight: 1,
};

export const navLink: SxProps<Theme> = {
  paddingY: 2,
  borderTopRightRadius: 50,
  borderBottomRightRadius: 50,
  marginBottom: 0.5,
  '&.active': {
    background: theme.palette.grey[400],
    boxShadow: `0 0 1px ${theme.spacing(0.5)} ${theme.palette.grey[100]}`,
  },
};

export const navLinkIcon: SxProps<Theme> = {
  minWidth: '40px',
};

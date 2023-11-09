import { SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

export type DashboardItemProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

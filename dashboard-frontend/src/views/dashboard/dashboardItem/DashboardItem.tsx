import { Paper } from '@mui/material';

import { mergeSx } from 'utils/mergeSx/mergeSx';

import * as styles from './DashboardItem.styles';
import { DashboardItemProps } from './DashboardItem.types';

export const DashboardItem = ({ children, sx }: DashboardItemProps) => {
  return <Paper sx={mergeSx(styles.container, sx)}>{children}</Paper>;
};

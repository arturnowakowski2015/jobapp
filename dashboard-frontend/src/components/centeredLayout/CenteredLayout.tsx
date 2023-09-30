import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import * as styles from './CenteredLayout.styles';
import { CenteredLayoutProps } from './CenteredLayout.types';

export const CenteredLayout = ({ children }: CenteredLayoutProps) => {
  return (
    <Box sx={styles.container}>
      <Outlet />
      {children}
    </Box>
  );
};

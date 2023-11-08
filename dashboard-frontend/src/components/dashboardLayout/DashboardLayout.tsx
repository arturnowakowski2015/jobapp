import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import * as styles from './DashboardLayout.styles';
import { SideBar } from './sideBar/SideBar';
import { TopBar } from './topBar/TopBar';

export const DashboardLayout = () => {
  return (
    <Box sx={styles.outerContainer}>
      <TopBar />
      <SideBar />
      <Box component="main" sx={styles.contentWrapper}>
        <Outlet />
      </Box>
    </Box>
  );
};

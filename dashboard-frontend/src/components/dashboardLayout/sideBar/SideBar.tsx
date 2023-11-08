import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import * as styles from './SideBar.styles';
import { sidebarItems } from './sideBarItems';

export const SideBar = () => {
  return (
    <Drawer sx={styles.sideBar} variant="permanent" anchor="left">
      <List sx={styles.menuList}>
        {sidebarItems.map(item => (
          <ListItem disablePadding key={item.url}>
            <ListItemButton
              component={NavLink}
              to={item.url}
              sx={styles.navLink}
            >
              <ListItemIcon sx={styles.navLinkIcon}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

import {
  AppBar,
  Avatar,
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PersonOutline, Logout } from '@mui/icons-material';

import { AppRoute } from 'AppRoute';
//  import { useProfileContext } from 'context/profileContext/useProfileContext';
import { getInitials } from 'utils/getInitials/getInitials';

import * as styles from './TopBar.styles';

export const TopBar = () => {
  //  const { profile } = useProfileContext();

  //  const profileFullName = `${profile.firstname} ${profile.lastname}`;
  const profileFullName = 'KW';
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    window.addEventListener('mousemove', event => {
      if (!avatarRef.current) return;

      const offset = 250;
      const { top, right, bottom, left } =
        avatarRef.current.getBoundingClientRect();

      if (event.clientX < left - offset) setAnchorEl(null);
      if (event.clientY < top - offset) setAnchorEl(null);
      if (event.clientX > right + offset) setAnchorEl(null);
      if (event.clientY > bottom + offset) setAnchorEl(null);
    });
  }, []);

  return (
    <AppBar sx={styles.topBar}>
      <Toolbar sx={styles.wrapper}>
        <Typography variant="h6" component="div">
          HR_Analytics
        </Typography>

        <Box onMouseEnter={onMouseEnter} ref={avatarRef}>
          <Avatar>{getInitials(profileFullName)}</Avatar>
          <Menu
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
          >
            <MenuItem sx={styles.usernameMenuItem} disabled>
              <ListItemIcon>
                <Avatar sx={styles.smallAvatar}>
                  {getInitials(profileFullName)}
                </Avatar>
              </ListItemIcon>
              <ListItemText>{profileFullName}</ListItemText>
            </MenuItem>

            <MenuItem
              sx={styles.menuItem}
              component={Link}
              to={AppRoute.profile}
            >
              <ListItemIcon>
                <PersonOutline />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>

            <MenuItem
              sx={styles.menuItem}
              component={Link}
              to={AppRoute.signIn}
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

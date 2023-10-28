import { Box, Button, Paper, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

import { AppRoute } from 'AppRoute';

import * as styles from './Home.styles';

export const Home = () => {
  return (
    <Paper sx={styles.container}>
      <Typography variant="h1">HR analytics</Typography>
      <Box sx={styles.buttonsContainer}>
        <Button
          component={Link}
          to={AppRoute.signIn}
          variant="contained"
          size="large"
        >
          Sign In
        </Button>
        <Button
          component={Link}
          to={AppRoute.signUp}
          variant="contained"
          size="large"
        >
          Sign Up
        </Button>
      </Box>
    </Paper>
  );
};

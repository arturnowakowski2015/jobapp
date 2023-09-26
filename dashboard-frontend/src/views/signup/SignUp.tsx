import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { RegisterPayload } from 'api/register/register.types';
import { useRegister } from 'api/register/useRegister';
import { AppRoute } from 'AppRoute';
import { emailRegex } from 'common/emailRegex';

import * as styles from './SignIn.styles';

export const SignUp = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<RegisterPayload>();

  const { onSubmit, errorMessage, isLoading } = useRegister();

  const password = watch('password');

  return (
    <Paper sx={styles.container} elevation={3}>
      <Typography component="h1" variant="h4">
        Sign In
      </Typography>

      <Box sx={styles.form} component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="standard"
          label="First name *"
          {...register('firstname', {
            required: 'This field cannot be empty',
            minLength: {
              value: 3,
              message: 'Please use at least 3 characters',
            },
          })}
          error={Boolean(errors.firstname)}
          helperText={errors.firstname?.message}
          fullWidth
        />
        <TextField
          variant="standard"
          label="Last name *"
          {...register('lastname', {
            required: 'This field cannot be empty',
            minLength: {
              value: 3,
              message: 'Please use at least 3 characters',
            },
          })}
          error={Boolean(errors.lastname)}
          helperText={errors.lastname?.message}
          fullWidth
        />
        <TextField
          variant="standard"
          label="E-mail *"
          {...register('username', {
            required: 'This field cannot be empty',
            pattern: {
              value: emailRegex,
              message: 'Please use a valid e-mail address',
            },
          })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
          fullWidth
        />

        <TextField
          variant="standard"
          label="Password *"
          type="password"
          {...register('password', {
            required: 'This field cannot be empty',
            minLength: {
              value: 3,
              message: 'Please use at least 5 characters',
            },
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          fullWidth
        />

        <TextField
          variant="standard"
          label="Retype Password *"
          type="password"
          {...register('passwordRepeat', {
            required: 'This field cannot be empty',
            validate: value =>
              value === password || 'The passwords do not match',
          })}
          error={Boolean(errors.passwordRepeat)}
          helperText={errors.passwordRepeat?.message}
          fullWidth
        />

        {errorMessage && (
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}

        <Button type="submit" variant="contained" disabled={isLoading}>
          {!isLoading && 'SIGN UP'}
          {isLoading && <CircularProgress color="inherit" size={24} />}
        </Button>

        <Typography>
          Already have an account? Then{' '}
          <Link to={AppRoute.signIn}>Sign In</Link>
        </Typography>
      </Box>
    </Paper>
  );
};

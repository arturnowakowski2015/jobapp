import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosInstance } from 'axios';
import { useCallback } from 'react';
import { useQuery } from 'api/useQuery/useQuery';

import { useMutation } from 'api/useMutation/useMutation';

import { AppRoute } from 'AppRoute';
import { DataPayload, LoginResponse } from './login.types';
//  import { useProfileContext } from 'context/profileContext/useProfileContext';

import * as styles from './Profile.styles';
import { ChangePassword } from './ChangePassword';

export const Profile = () => {
  const navigate = useNavigate();

  const { state } = useQuery({ url: '/users/me', initFetch: true });

  const onSuccess = useCallback(() => {
    navigate(AppRoute.dashboard);
  }, [navigate]);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<DataPayload>();

  const { onMutate } = useMutation({
    mutateFn: (axios: AxiosInstance) => (payload: DataPayload) =>
      axios.put<LoginResponse>('/users/me', payload),
    onSuccess,
  });

  if (state.isLoading) return <CircularProgress />;

  if (state.errorMessage || (!state.isLoading && !state.data)) {
    navigate(AppRoute.dashboard);
    return null;
  }
  console.log(state);
  return (
    <Paper sx={styles.container} elevation={3}>
      <Box>
        <Typography variant="h5" component="h2" marginBottom={3}>
          Profile
        </Typography>
        <Box>
          <Typography component="span" fontWeight={600}>
            Your name:{' '}
          </Typography>
          <Typography component="span">{state.data?.firstName}</Typography>
        </Box>
        <Box>
          <Typography component="span" fontWeight={600}>
            Your last name:{' '}
          </Typography>
          <Typography component="span">{state.data?.lastName}</Typography>
        </Box>
        <Box>
          <Typography component="span" fontWeight={600}>
            Your email:{' '}
          </Typography>
          <Typography component="span">{state.data?.email}</Typography>
        </Box>
      </Box>
      <Box sx={styles.box}>
        <ChangePassword />

        <Box
          sx={styles.form}
          component="form"
          onSubmit={handleSubmit(onMutate)}
        >
          <Typography component="span">first name</Typography>
          <TextField
            variant="standard"
            label="first name *"
            type="standard"
            {...register('firstName', {
              required: 'This field cannot be empty',
              minLength: {
                value: 4,
                message: 'Please use at least 5 characters',
              },
            })}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
            inputProps={{ maxLength: 12 }}
          />

          <Typography component="span">last name</Typography>
          <TextField
            variant="standard"
            label="last name *"
            type="standard"
            {...register('lastName', {
              required: 'This field cannot be empty',
              minLength: {
                value: 4,
                message: 'Please use at least 5 characters',
              },
            })}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
          />
          <Button type="submit" variant="contained" disabled={state.isLoading}>
            change names
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

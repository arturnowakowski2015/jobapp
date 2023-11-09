import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { AxiosInstance } from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from 'AppRoute';
import { useMutation } from 'api/useMutation/useMutation';
import { LoginResponse, PasswordPayload } from './login.types';

import * as styles from './Profile.styles';

export const ChangePassword = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<PasswordPayload>();

  const onSuccess = useCallback(() => {
    navigate(AppRoute.signIn);
  }, [navigate]);

  const { onMutate } = useMutation({
    mutateFn: (axios: AxiosInstance) => (payload: PasswordPayload) =>
      axios.post<LoginResponse>('/auth/change-password', payload),
    onSuccess,
  });

  return (
    <Box sx={styles.form} component="form" onSubmit={handleSubmit(onMutate)}>
      <Typography component="span">old password</Typography>
      <TextField
        variant="standard"
        label="Password *"
        type="password"
        {...register('oldPassword', {
          required: 'This field cannot be empty',
          minLength: {
            value: 4,
            message: 'Please use at least 5 characters',
          },
        })}
        error={Boolean(errors.oldPassword)}
        helperText={errors.oldPassword?.message}
        inputProps={{ maxLength: 12 }}
      />

      <Typography component="span">new password</Typography>
      <TextField
        variant="standard"
        label="Password *"
        type="password"
        {...register('newPassword', {
          required: 'This field cannot be empty',
          minLength: {
            value: 4,
            message: 'Please use at least 5 characters',
          },
        })}
        error={Boolean(errors.newPassword)}
        helperText={errors.newPassword?.message}
      />
      <Button type="submit" variant="contained">
        change password
      </Button>
    </Box>
  );
};

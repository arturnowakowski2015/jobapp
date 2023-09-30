// import {
//   Box,
//   Button,
//   Checkbox,
//   CircularProgress,
//   FormControlLabel,
//   FormGroup,
//   Paper,
//   TextField,
//   Typography,
// } from '@mui/material';
//  import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { AxiosResponse } from 'axios';

import { useAxios } from 'api/axios/useAxios';
import { emailRegex } from 'common/emailRegex';
import { useMutation } from 'api/useMutation/useMutation';
import { AppRoute } from 'AppRoute';
import { useTokenContext } from 'context/tokenContext/useTokenContext';

import { LoginPayload, LoginResponse } from './login.types';

//  import * as styles from './SignIn.styles';

export const SignIn = () => {
  const { onTokenSave } = useTokenContext();
  const navigate = useNavigate();
  const axiosClient = useAxios();
  const onSuccess = useCallback(
    (res: AxiosResponse<LoginResponse>) => {
      alert(res.data.accessToken);
      onTokenSave({
        newToken: res.data.accessToken,
        //  storeTokenInStorage: true,
      });
      navigate(AppRoute.dashboard);
    },
    [navigate, onTokenSave],
  );
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginPayload>();

  const { state, onMutate } = useMutation({
    mutateFn: (payload: LoginPayload) =>
      axiosClient.post<LoginResponse>('auth/login', payload),
    onSuccess,
  });
  // const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  // const onSubmit = useCallback(async (payl: LoginPayload) => {
  //   await axios.post('/auth/login', payl);
  // }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onMutate)}>
        <input
          type="text"
          {...register('email', {
            required: 'This field cannot be empty',
            pattern: {
              value: emailRegex,
              message: 'Please use a valid e-mail address',
            },
          })}
        />
        {Boolean(errors.email) && <>bbbb</>}
        <input
          type="password"
          {...register('password', {
            required: 'This field cannot be empty',
            minLength: {
              value: 4,
              message: 'Please use at least 5 characters',
            },
          })}
        />

        {state.errorMessage && <div>{state.errorMessage}</div>}

        <button type="submit" disabled={state.isLoading}>
          {!state.isLoading && 'SIGN IN'}
          log in
        </button>

        <div>
          Don&apos;t have an account?{' '}
          <Link to={AppRoute.signUp}>Click here to create one</Link>
        </div>
      </form>
    </div>

    // <Paper sx={styles.container} elevation={3}>
    //   <Typography component="h1" variant="h4">
    //     Sign In
    //   </Typography>

    //   <Box sx={styles.form} component="form" onSubmit={handleSubmit(onSubmit)}>
    //     <TextField
    //       variant="standard"
    //       label="E-mail *"
    //       {...register('username', {
    //         required: 'This field cannot be empty',
    //         pattern: {
    //           value: emailRegex,
    //           message: 'Please use a valid e-mail address',
    //         },
    //       })}
    //       error={Boolean(errors.username)}
    //       helperText={errors.username?.message}
    //       fullWidth
    //     />

    //     <TextField
    //       variant="standard"
    //       label="Password *"
    //       type="password"
    //       {...register('password', {
    //         required: 'This field cannot be empty',
    //         minLength: {
    //           value: 4,
    //           message: 'Please use at least 5 characters',
    //         },
    //       })}
    //       error={Boolean(errors.password)}
    //       helperText={errors.password?.message}
    //       fullWidth
    //     />

    //     <FormGroup>
    //       <FormControlLabel
    //         control={
    //           <Checkbox
    //             checked={isRememberMeChecked}
    //             onChange={e => setIsRememberMeChecked(e.target.checked)}
    //           />
    //         }
    //         label="Remember me"
    //       />
    //     </FormGroup>

    //     {loginState.errorMessage && (
    //       <Typography variant="body2" color="error">
    //         {loginState.errorMessage}
    //       </Typography>
    //     )}

    //     <Button
    //       type="submit"
    //       variant="contained"
    //       disabled={loginState.isLoading}
    //     >
    //       {!loginState.isLoading && 'SIGN IN'}
    //       {loginState.isLoading && (
    //         <CircularProgress color="inherit" size={24} />
    //       )}
    //       log in
    //     </Button>

    //     <Typography>
    //       Don&apos;t have an account?{' '}
    //       <Link to={AppRoute.signUp}>Click here to create one</Link>
    //     </Typography>
    //   </Box>
    // </Paper>
  );
};

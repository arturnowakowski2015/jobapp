import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { isAxiosError, useAxios } from 'api/axios/useAxios';
import { AppRoute } from 'AppRoute';
import { useTokenContext } from 'context/tokenContext/useTokenContext';

import { LoginPayload, LoginResponse } from './login.types';
import { defaultLoginReducerState, loginReducer } from './loginReducer';

export const useLogin = () => {
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const { onTokenSave } = useTokenContext();

  const axios = useAxios();

  const [loginState, dispatchLoginAction] = useReducer(
    loginReducer,
    defaultLoginReducerState,
  );
  const navigate = useNavigate();

  const onSubmit = async (body: LoginPayload) => {
    dispatchLoginAction({ type: 'init' });

    try {
      const { data } = await axios.post<LoginResponse>('/auth/login', body);

      onTokenSave({
        newToken: data.access_token,
        storeTokenInStorage: isRememberMeChecked,
      });

      navigate(AppRoute.dashboard);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        dispatchLoginAction({ type: 'error', payload: 'Invalid credentials' });
        return;
      }

      dispatchLoginAction({
        type: 'error',
        payload: 'Something went wrong. Try again.',
      });
    } finally {
      dispatchLoginAction({ type: 'finish' });
    }
  };

  return {
    loginState,
    isRememberMeChecked,
    onSubmit,
    setIsRememberMeChecked,
  };
};

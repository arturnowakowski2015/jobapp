import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { isAxiosError, useAxios } from 'api/axios/useAxios';
import { AppRoute } from 'AppRoute';

import { RegisterPayload } from './register.types';

export const useRegister = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit = async (body: RegisterPayload) => {
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      await axios.post('/auth/register', body);

      navigate(AppRoute.signIn);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        setErrorMessage(error.message);
        return;
      }
      setErrorMessage('2');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    errorMessage,
    isLoading,
    onSubmit,
  };
};

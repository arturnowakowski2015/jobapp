// import { useReducer, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { AppRoute } from 'AppRoute';
// import { useTokenContext } from 'context/tokenContext/useTokenContext';

// import { LoginPayload, LoginResponse } from './login.types';

import { useCallback, useReducer } from 'react';

import { useAxios, isAxiosError } from 'api/axios/useAxios';

//  import axios from 'api/axios/axios';
import { defaultState, mutationReducer } from './mutationReducer';
import { UseMutationProps } from './useMutation.types';

export const useMutation = <T extends unknown, R extends unknown>({
  mutateFn,
  onSuccess,
}: UseMutationProps<T, R>) => {
  const [state, dispatch] = useReducer(mutationReducer, defaultState);
  const axiosClient = useAxios();
  const onMutate = useCallback(
    async (payload: T) => {
      try {
        // const { data } = await axios.post('/auth/login', payload);
        dispatch({ type: 'init' });
        const res = await mutateFn(axiosClient)(payload);
        if (onSuccess) onSuccess(res);
        // console.log('ccccccccccc  ', JSON.stringify(data));
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          dispatch({
            type: 'error',
            payload: 'Something went wrong. Try again.',
          });
          return;
        }
      } finally {
        dispatch({ type: 'finish' });
      }
    },
    [mutateFn, onSuccess],
  );

  return { onMutate, state };
};

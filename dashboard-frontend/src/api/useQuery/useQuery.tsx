// import { useReducer, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { AppRoute } from 'AppRoute';
// import { useTokenContext } from 'context/tokenContext/useTokenContext';

// import { LoginPayload, LoginResponse } from './login.types';

import { useCallback, useReducer, useEffect } from 'react';
import { useAxios, isAxiosError } from 'api/axios/useAxios';
import { QueryState, QueryAction, UseQueryProps } from './useQuery.types';
//  import axios from 'api/axios/axios';
import { defaultState, queryReducer } from './queryReducer';

export const useQuery = <T extends unknown>({
  url,
  initFetch,
}: UseQueryProps) => {
  const axiosClient = useAxios();
  const [state, dispatch] = useReducer<
    (state: QueryState<T>, action: QueryAction) => QueryState<T>
  >(queryReducer, defaultState);
  const onQuery = useCallback(async () => {
    try {
      // const { data } = await axios.post('/auth/login', payload);
      dispatch({ type: 'init' });
      const res = await axiosClient.get<T>(url);
      dispatch({ type: 'success', payload: res.data });
      // console.log('ccccccccccc  ', JSON.stringify(data));
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        dispatch({
          type: 'error',
          payload: 'YOu are not authorised.',
        });
        return;
      }
      dispatch({
        type: 'error',
        payload: 'Something went wrong. Try again.',
      });
    }
  }, [axiosClient, url]);

  useEffect(() => {
    if (initFetch) {
      onQuery();
    }
  }, [initFetch, onQuery]);
  return { onQuery, state };
};

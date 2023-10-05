import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';

import { AppRoute } from 'AppRoute';
import { useProfile } from 'api/profile/useProfile';
import { ProfileContextController } from 'context/profileContext/ProfileContextController';
import { useTokenContext } from 'context/tokenContext/useTokenContext';
import { CenteredLayout } from 'components/centeredLayout/CenteredLayout';

import { ProtectedRouteProps } from './ProtectedRoute.types';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const { data, isLoading, errorMessage } = useProfile();
  const {
    accessToken, //   onTokenClear
  } = useTokenContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !accessToken //   || errorMessage || (!isLoading && !data)
    ) {
      //  onTokenClear();
      navigate(AppRoute.signIn);
    }
  }, [
    accessToken,
    navigate, // ,data, errorMessage, isLoading,  onTokenClear
  ]);

  // if (isLoading) {
  //   return (
  //     <CenteredLayout>
  //       <CircularProgress />
  //     </CenteredLayout>
  //   );
  // }

  // if (errorMessage || !data) return null;

  return (
    // <ProfileContextController profile={data}>
    <div>{children}</div>
    // </ProfileContextController>
  );
};

import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';

//  import { CircularProgress } from '@mui/material';
import { AppRoute } from 'AppRoute';
//  import { useProfile } from 'api/profile/useProfile';
//  import { ProfileContextController } from 'context/profileContext/ProfileContextController';
import { useTokenContext } from 'context/tokenContext/useTokenContext';
//  import { CenteredLayout } from 'components/centeredLayout/CenteredLayout';

import { useQuery } from 'api/useQuery/useQuery';
import { Profile } from 'types/profile.types';
import { ProtectedRouteProps } from './ProtectedRoute.types';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const { data, isLoading, errorMessage } = useProfile();
  const {
    accessToken, //   onTokenClear
  } = useTokenContext();

  const navigate = useNavigate();

  const { state, onQuery } = useQuery<Profile>({
    url: '/users/me',
    initFetch: false,
  });
  const checkProfile = useCallback(async () => {
    onQuery();
  }, [onQuery]);

  useEffect(() => {
    if (
      !accessToken //   || errorMessage || (!isLoading && !data)
    ) {
      //  onTokenClear();
      navigate(AppRoute.signIn);
      return;
    }
    checkProfile();
  }, [
    accessToken,
    navigate,
    checkProfile, // ,data, errorMessage, isLoading,  onTokenClear
  ]);
  useEffect(() => {
    if (state.errorMessage) {
      navigate(AppRoute.signIn);
    }
  }, [navigate, state.errorMessage]);
  //   if (isLoading) {
  //   return (
  //     <CenteredLayout>
  //       <CircularProgress />
  //     </CenteredLayout>
  //   );
  // }

  if (state.isLoading || state.errorMessage || !accessToken) return null;
  return (
    // <ProfileContextController profile={data}>
    <div>
      {children && children}
      {!children && <Outlet />}
    </div>
    // </ProfileContextController>
  );
};

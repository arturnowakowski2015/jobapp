import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
//  import { CircularProgress } from '@mui/material';

import { AppRoute } from 'AppRoute';
//  import { useProfile } from 'api/profile/useProfile';
//  import { ProfileContextController } from 'context/profileContext/ProfileContextController';
import { useTokenContext } from 'context/tokenContext/useTokenContext';
//  import { CenteredLayout } from 'components/centeredLayout/CenteredLayout';

import { ProtectedRouteProps } from './ProtectedRoute.types';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const { data, isLoading, errorMessage } = useProfile();
  const {
    accessToken, //   onTokenClear
  } = useTokenContext();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const checkProfile = useCallback(async () => {
    try {
      await axios.get('http://localhost:9595/users/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (_error) {
      navigate(AppRoute.signIn);
    }
    setIsLoading(false);
  }, [accessToken, navigate]);

  useEffect(() => {
    if (
      !accessToken //   || errorMessage || (!isLoading && !data)
    ) {
      //  onTokenClear();
      navigate(AppRoute.signIn);
      setIsLoading(false);
      //  return;
    }
    //  checkProfile();
  }, [
    accessToken,
    navigate,
    checkProfile, // ,data, errorMessage, isLoading,  onTokenClear
  ]);

  // if (isLoading) {
  //   return (
  //     <CenteredLayout>
  //       <CircularProgress />
  //     </CenteredLayout>
  //   );
  // }

  // if (errorMessage || !data) return null;
  if (isLoading) return null;
  return (
    // <ProfileContextController profile={data}>
    <div>{children}</div>
    // </ProfileContextController>
  );
};

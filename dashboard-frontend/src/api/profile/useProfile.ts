import { useCallback, useEffect, useState } from 'react';

import { useAxios } from 'api/axios/useAxios';

import { Profile } from '../../types/profile.types';

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [data, setData] = useState<Profile>();
  const axios = useAxios();

  const fetchProfileData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const { data: profileData } = await axios.get<Profile>('/app/profile');
      setData(profileData);
    } catch (_error) {
      setErrorMessage('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  return {
    data,
    isLoading,
    errorMessage,
  };
};

import { useMemo } from 'react';

import { ProfileContext } from './ProfileContext';
import { ProfileContextControllerProps } from './ProfileContext.types';

export const tokenStorageKey = 'access_token';

export const ProfileContextController = ({
  children,
  profile,
}: ProfileContextControllerProps) => {
  const contextValue = useMemo(
    () => ({
      profile,
    }),
    [profile],
  );

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

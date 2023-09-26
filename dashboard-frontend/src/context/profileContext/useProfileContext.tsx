import { useContext } from 'react';

import { ProfileContext } from './ProfileContext';

export const useProfileContext = () => {
  const ctx = useContext(ProfileContext);

  if (!ctx) {
    throw new Error(
      'useProfileContext can only be used inside ProfileContextController.',
    );
  }

  return ctx;
};

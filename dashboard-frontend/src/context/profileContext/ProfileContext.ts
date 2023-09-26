import { createContext } from 'react';

import { ProfileContextValue } from './ProfileContext.types';

export const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined,
);

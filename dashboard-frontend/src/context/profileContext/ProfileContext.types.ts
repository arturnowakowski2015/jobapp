import { ReactNode } from 'react';

import { Profile } from 'types/profile.types';

export type ProfileContextValue = {
  profile: Profile;
};

export type ProfileContextControllerProps = {
  children: ReactNode;
  profile: Profile;
};

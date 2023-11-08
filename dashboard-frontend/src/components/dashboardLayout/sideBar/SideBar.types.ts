import { ReactNode } from 'react';

import { AppRoute } from 'AppRoute';

export type SideBarItem = {
  url: AppRoute;
  text: string;
  icon: ReactNode;
};

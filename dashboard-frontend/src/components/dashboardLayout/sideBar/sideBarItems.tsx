import {
  HomeOutlined,
  ChatBubbleOutline,
  PersonOutline,
} from '@mui/icons-material';

import { AppRoute } from 'AppRoute';

import { SideBarItem } from './SideBar.types';

export const sidebarItems: SideBarItem[] = [
  { text: 'Home', url: AppRoute.dashboard, icon: <HomeOutlined /> },
  { text: 'Jobs', url: AppRoute.jobs, icon: <ChatBubbleOutline /> },
  { text: 'Candidates', url: AppRoute.candidates, icon: <PersonOutline /> },
];

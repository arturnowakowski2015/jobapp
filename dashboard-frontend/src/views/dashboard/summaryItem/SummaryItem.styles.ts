import { SxProps, Theme } from '@mui/material';

import { theme } from 'theme/theme';

import { IconVariant } from './SummaryItem.types';

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
};

export const contentWrapper: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
};

export const name: SxProps<Theme> = {
  color: theme.palette.grey[400],
};

export const iconVariantToColor: Record<IconVariant, SxProps<Theme>> = {
  blue: {
    backgroundColor: '#0c75d1',
  },
  green: {
    backgroundColor: '#17d3a7',
  },
  yellow: {
    backgroundColor: '#f7c627',
  },
};

export const iconContainer: SxProps<Theme> = {
  padding: 1.5,
  borderRadius: 2,
  color: '#fff',
  display: 'grid',
  placeItems: 'center',
};

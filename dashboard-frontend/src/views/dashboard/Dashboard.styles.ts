import { SxProps, Theme } from '@mui/material';

import { theme } from 'theme/theme';

export const container: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: 5,
  rowGap: 2,
};

export const spanFull: SxProps<Theme> = {
  gridColumn: 'span 2',
};

export const generalTextWrapper: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: 2,
};

export const grayedText: SxProps<Theme> = {
  color: theme.palette.grey[500],
};

export const summaryItemsContainer: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
};

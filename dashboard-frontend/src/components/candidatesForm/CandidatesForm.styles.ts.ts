import { SxProps, Theme } from '@mui/material';

export const container: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 2,
  width: '55%',
};

export const multiline: SxProps<Theme> = {
  gridRow: 'span 2',
};

export const button: SxProps<Theme> = {
  gridColumn: 'span 2',
};

import { SxProps, Theme } from '@mui/material';

export const container: SxProps<Theme> = {
  paddingX: 10,
  paddingY: 5,
  borderRadius: 4,
  minWidth: '30rem',
};

export const form: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  rowGap: 1,
  marginTop: 2,
};

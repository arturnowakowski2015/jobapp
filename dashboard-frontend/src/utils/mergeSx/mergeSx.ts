import { SxProps, Theme } from '@mui/material';

export const mergeSx = (...styleObjects: (SxProps<Theme> | undefined)[]) => {
  return styleObjects
    .filter((obj): obj is SxProps<Theme> => Boolean(obj))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

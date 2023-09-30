import { CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

import { TokenContextController } from 'context/tokenContext/TokenContextController';
import { theme } from 'theme/theme';

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <TokenContextController>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </TokenContextController>
);

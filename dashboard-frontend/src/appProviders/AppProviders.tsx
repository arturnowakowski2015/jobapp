import { CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

import { theme } from 'theme/theme';
import { TokenContextController } from 'context/tokenContext/TokenContextController';

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <TokenContextController>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </TokenContextController>
);

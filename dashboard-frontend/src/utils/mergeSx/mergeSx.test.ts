import { SxProps, Theme } from '@mui/material';

import { mergeSx } from './mergeSx';

describe('mergeSx', () => {
  it('merges 2 style objects', () => {
    const styleObj1: SxProps<Theme> = { display: 'flex' };
    const styleObj2: SxProps<Theme> = { paddingX: 2 };

    expect(mergeSx(styleObj1, styleObj2)).toEqual({
      display: 'flex',
      paddingX: 2,
    });
  });

  it('merges 4 style objects and overrides properties', () => {
    const styleObj1: SxProps<Theme> = { display: 'flex' };
    const styleObj2: SxProps<Theme> = { paddingX: 2 };
    const styleObj3: SxProps<Theme> = { position: 'absolute', left: 0 };
    const styleObj4: SxProps<Theme> = { paddingX: 5 };

    expect(mergeSx(styleObj1, styleObj2, styleObj3, styleObj4)).toEqual({
      left: 0,
      display: 'flex',
      paddingX: 5,
      position: 'absolute',
    });
  });

  it('omits undefined', () => {
    const styleObj1: SxProps<Theme> = { display: 'flex' };
    const styleObj2 = undefined;

    expect(mergeSx(styleObj1, styleObj2)).toEqual({
      display: 'flex',
    });
  });
});

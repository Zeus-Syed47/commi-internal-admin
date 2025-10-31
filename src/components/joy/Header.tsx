import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { toggleSidebar } from '@/utils/joy/utils';
import WBLogo from '../image/WBLogo';
import { Grid2 } from '@mui/material';
import { Box } from '@mui/joy';
import Link from 'next/link';


export default function JoyHeader() {
  return (
    <Sheet
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 1,
        p: 2,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
        boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('lg')]: {
              '--Header-height': '0px',
            },
          },
        })}
      />
      <Grid2 sx={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <IconButton
          onClick={() => toggleSidebar()}
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <MenuRoundedIcon />
        </IconButton>
        <Box sx={{ ml: 2 }}>
          <Link href={'/'}>
            <WBLogo height={100} width={100} />
          </Link>
        </Box>
      </Grid2>
    </Sheet>
  );
}

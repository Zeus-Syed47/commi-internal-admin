'use client'

import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Button, Grid } from '@mui/material';
import Image from 'next/image';
import PortfoLogo from '@/components/image/PortfoLogo';
import WBLogo from '@/components/image/WBLogo';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import OfflineBoltRoundedIcon from '@mui/icons-material/OfflineBoltRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { BroadcastOnHome, Inbox, Light, SignalCellular0Bar, Wifi } from '@mui/icons-material';
import { Avatar, Chip } from '@mui/joy';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import useStore from '@/store';
import { userLogOut } from '@/api/users';
import { useMutation } from '@tanstack/react-query';
import { redirect, useRouter } from 'next/navigation';
import { DrawerContext } from '@/context/drawerContext';
import Link from 'next/link'


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const CommonDrawer = React.memo(({ children }) => {
  const { verticalRoutes, updateRouteState, unreadCount, currentUser, mutate } = React.useContext(DrawerContext)

  const [open, setOpen] = React.useState(true);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  const handleUserLogout = React.useCallback(() => {
    mutate();
  }, [mutate])

  return (
    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', width: '100%' }}>

      <Box sx={{ width: '100%', backgroundColor: 'white', display: 'flex', flex: 1, flexDirection: 'row', borderBottom: '0.5px solid black' }}>
        <Link href='/'>
          <WBLogo onClick={handleDrawerOpen} />
        </Link>

        <List

          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          {verticalRoutes?.map((route, index) => (
            <Link href={route?.path}>
              <ListItem key={route?.text} disablePadding sx={{ width: 'auto' }}>
                <ListItemButton
                  onClick={() => {
                    updateRouteState(route?.path);
                  }}
                  href={route?.path}
                  selected={route?.selected}
                  sx={{
                    // minHeight: 48,
                    // justifyContent: open ? 'initial' : 'center',
                    // px: 2.5,
                    width: 'auto'
                  }}
                >

                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 1
                      // mr: open ? 3 : 'auto',
                      // justifyContent: 'center',
                    }}
                  >
                    {route?.icon}
                  </ListItemIcon>
                  <ListItemText primary={route?.text} />
                  {unreadCount > 0 && route?.path === '/inbox' &&
                    <Chip
                      sx={{ ml: 1.5 }}
                      variant="soft"
                      color="primary"
                      size="md"
                      slotProps={{ root: { component: 'span' } }}
                    >{unreadCount}</Chip>
                  }

                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        {/* <Divider /> */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', p: 1 }}>
          <Avatar
            variant="outlined"
            size="sm"
          // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
          />
          <Box sx={{ minWidth: 0, flex: 1, }}>
            <Typography sx={{
              fontSize: 14
            }}>{currentUser?.name}</Typography>
            <Typography sx={{
              fontSize: 14
            }}>{currentUser?.email}</Typography>
          </Box>
          <IconButton onClick={() => handleUserLogout()}>
            <LogoutRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      <Box component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', }} >
        {children}
      </Box>
    </Box>
  );
});

export default CommonDrawer;
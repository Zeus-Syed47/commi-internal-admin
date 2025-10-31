"use client";

import { useTheme, useMediaQuery } from '@mui/material';

export const useViewportSize = () => {
  const theme = useTheme();
  
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
  };
};

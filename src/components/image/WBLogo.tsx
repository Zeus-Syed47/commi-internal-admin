import * as React from 'react';
import Image from 'next/image';
import { useTheme } from '@mui/joy/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function WBLogo(props) {
  const { onClick } = props;
  const theme = useTheme();

  return (
    <Image
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      src="/newcommiailogo.png"
      alt="WB Logo"
      className="dark:invert"
      width={props?.width ?? 140}
      height={props?.height ?? 140}
      priority
    />
  );
}

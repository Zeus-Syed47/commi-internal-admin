import * as React from 'react';
import { Box, Skeleton } from '@mui/joy';

interface Props {
  columnCount?: number;
}

const TableSkeleton = ({ columnCount = 5 }: Props) => {
  const rowCount = typeof window !== 'undefined' ? Math.floor(window.innerHeight / 30) : 20; // adjust for row height
  const widthOfCell = ['10%', '85%', '5%']

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: 2,
        backgroundColor: 'background.level1',
      }}
    >
      {/* Row Skeletons */}
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {Array.from({ length: rowCount }).map((_, rowIndex) => (
          <Box key={rowIndex} sx={{ display: 'flex', gap: 2 }}>
            {Array.from({ length: columnCount }).map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                variant="rectangular"
                width={widthOfCell[colIndex]}
                height={20}
              // sx={{ flex: 1 }}
              />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TableSkeleton;

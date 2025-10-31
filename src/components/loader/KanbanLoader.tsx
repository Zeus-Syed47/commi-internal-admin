import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Skeleton from '@mui/joy/Skeleton';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Avatar from '@mui/joy/Avatar';
import LinearProgress from '@mui/joy/LinearProgress';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Configuration for the loader
const columns = [
    { id: 'col1', title: 'Qualified', cards: 4 },
    { id: 'col2', title: 'Contact Made', cards: 3 },
    { id: 'col3', title: 'Demo Scheduled', cards: 2 },
    { id: 'col4', title: 'Proposal made', cards: 5 },
    { id: 'col4', title: 'Deal won', cards: 5 },
    { id: 'col4', title: 'Deal lost', cards: 5 },
];

// Generate random width for skeletons to create variety
const getRandomWidth = (min: number, max: number) => {
    return `${Math.floor(Math.random() * (max - min + 1)) + min}%`;
};

// Card skeleton component
const CardSkeleton = () => {
    const titleWidth = getRandomWidth(60, 90);
    const descWidth = getRandomWidth(70, 95);
    const chipCount = Math.floor(Math.random() * 3) + 1;

    return (
        <Card
            variant="outlined"
            sx={{
                mb: 2,
                width: '100%',
                boxShadow: 'sm',
                animation: 'pulse 1.5s infinite ease-in-out',
                '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.85 },
                    '100%': { opacity: 1 },
                },
            }}
        >
            <CardContent sx={{ pb: 1 }}>
                <Skeleton variant="text" width={titleWidth} height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width={descWidth} height={16} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width={getRandomWidth(40, 80)} height={16} sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                    {Array.from({ length: chipCount }).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            width={getRandomWidth(15, 30)}
                            height={24}
                            sx={{ borderRadius: 'sm' }}
                        />
                    ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton variant="circular" width={28} height={28} />
                    <Box sx={{ width: '40%' }}>
                        <Skeleton variant="rectangular" width="100%" height={6} sx={{ borderRadius: 'lg' }} />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

// Column skeleton component
const ColumnSkeleton = ({ title, cardCount }: { title: string; cardCount: number }) => {
    return (
        <Sheet
            variant="outlined"
            sx={{
                width: { xs: '85%', sm: 300 },
                minWidth: { xs: 250, sm: 300 },
                maxWidth: { xs: '85%', sm: 300 },
                height: 'fit-content',
                borderRadius: 'md',
                flexShrink: 0,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.level1',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography level="title-md">{title}</Typography>
                    <Chip variant="soft" size="sm" sx={{ opacity: 0.7 }}>
                        {cardCount}
                    </Chip>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="sm" variant="plain" color="neutral" disabled>
                        <AddIcon />
                    </IconButton>
                    <IconButton size="sm" variant="plain" color="neutral" disabled>
                        <MoreVertIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ p: 2, height: '100%' }}>
                {Array.from({ length: cardCount }).map((_, index) => (
                    <CardSkeleton key={index} />
                ))}
            </Box>
        </Sheet>
    );
};

export default function KanbanBoardLoader() {
    const [loading, setLoading] = React.useState(true);

    // Simulate loading state toggle for demonstration
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleReload = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    return (
        <CssVarsProvider>
            <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                    <Typography level="h3">Project Board</Typography>
                    <Button onClick={handleReload} disabled={loading}>
                        {loading ? 'Loading...' : 'Reload'}
                    </Button>
                </Box>

                {loading && (
                    <LinearProgress
                        determinate={false}
                        sx={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            mb: 2,
                            '--LinearProgress-radius': '0px',
                        }}
                    />
                )}

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        overflowX: 'auto',
                        pb: 2,
                        px: 1,
                        '&::-webkit-scrollbar': {
                            height: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: '8px',
                            backgroundColor: 'neutral.400',
                        },
                    }}
                >
                    {loading ? (
                        columns.map((column) => (
                            <ColumnSkeleton
                                key={column.id}
                                title={column.title}
                                cardCount={column.cards}
                            />
                        ))
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', py: 10 }}>
                            <Typography level="h4" textColor="text.tertiary">
                                Data loaded! Replace this with your actual Kanban board.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </CssVarsProvider>
    );
}
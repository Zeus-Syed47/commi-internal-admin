import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import CircularWithValueLabel from '@/components/progress';
import { percentageCalculator } from '@/utils/format/percentage';
import { Chip, CircularProgress, Divider } from '@mui/joy';

interface ProgressItemProps {
    value: number;
    label: string;
    description: string;
    color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
}

const ProgressItem = ({ progress, count = 0, label, color }: any) => (
    <Card
        variant="outlined"
        sx={{
            minWidth: { xs: '180px', sm: '200px' },
            flexShrink: 0,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'space-between',
            gap: 1,
        }}
    >
        {/* Header section with label and count */}
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1
        }}>
            <Box>
                <Typography level="body-xs" textColor="text.tertiary">
                    {(label || '')?.toUpperCase()}
                </Typography>
                <Typography level="title-lg">
                    {count?.toLocaleString()}
                </Typography>
            </Box>
            <CircularWithValueLabel
                progress={
                    progress
                }
                color={color}
            />
        </Box>
    </Card>
);

export default function BoroadcastMetrics({ messages, contacts, isLoading }) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [showScrollButtons, setShowScrollButtons] = React.useState({
        left: false,
        right: false
    });

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setShowScrollButtons({
                left: scrollLeft > 0,
                right: scrollLeft < scrollWidth - clientWidth - 10 // 10px threshold
            });
        }
    };

    React.useEffect(() => {
        handleScroll();
        window.addEventListener('resize', handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const progressItems: ProgressItemProps[] = React.useMemo(() => [
        {
            value: 75,
            label: 'Queued',
            color: 'neutral',
            count: messages?.filter(item => item?.double_tick_status === 'queued')?.length ?? 0,
            progress: percentageCalculator(
                contacts?.length ?? 0,
                messages?.filter(item => item?.double_tick_status === 'queued')?.length ?? 0
            )
        },
        {
            value: 25,
            label: 'Failed',
            color: 'danger',
            count: messages?.filter(item => item?.double_tick_status === 'failed')?.length ?? 0,
            progress: percentageCalculator(
                contacts?.length ?? 0,
                messages?.filter(item => item?.double_tick_status === 'failed')?.length ?? 0
            )
        },
        {
            value: 45,
            label: 'Sent',
            color: 'primary',
            count: messages?.filter(item => item?.double_tick_status === 'sent' || item?.double_tick_status === 'delivered' || item?.double_tick_status === 'read')?.length ?? 0,
            progress: percentageCalculator(
                contacts?.length ?? 0,
                messages?.filter(item => item?.double_tick_status === 'sent' || item?.double_tick_status === 'delivered' || item?.double_tick_status === 'read')?.length ?? 0
            )
        },
        {
            value: 90,
            label: 'Delivered',
            color: 'primary',
            count: messages?.filter(item => item?.double_tick_status === 'delivered' || item?.double_tick_status === 'read')?.length ?? 0,
            progress: percentageCalculator(
                contacts?.length ?? 0,
                messages?.filter(item => item?.double_tick_status === 'delivered' || item?.double_tick_status === 'read')?.length ?? 0
            )
        },
        {
            value: 95,
            label: 'Read',
            color: 'success',
            count: messages?.filter(item => item?.double_tick_status === 'read')?.length ?? 0,
            progress: percentageCalculator(
                contacts?.length ?? 0,
                messages?.filter(item => item?.double_tick_status === 'read')?.length ?? 0
            )
        },
        {
            value: 95,
            label: 'Replied',
            color: 'success',
            count: messages?.filter(item => item?.replied)?.length ?? 0,
            progress: percentageCalculator(
                contacts?.length ?? 0,
                messages?.filter(item => item?.replied)?.length ?? 0
            )
        },
        {
            value: 95,
            label: 'Not Replied',
            color: 'warning',
            count: messages?.filter(item => !item?.replied && item?.double_tick_status === 'read')?.length ?? 0,
            progress: percentageCalculator(
                contacts?.length ?? 0,
                messages?.filter(item => !item?.replied && item?.double_tick_status === 'read')?.length ?? 0
            )
        }
    ], [contacts, messages]);



    return (
        <CssVarsProvider>
            {isLoading
                ?
                <Sheet
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '100%',
                        maxWidth: '100vw',
                        overflow: 'hidden',
                        p: 2,
                        minHeight: {
                            xs: '40%',
                            sm: '20%'
                        }
                    }
                    }
                >
                    <CircularProgress />
                </Sheet>
                :
                <Sheet
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '100%',
                        maxWidth: '100vw',
                        overflow: 'hidden',
                        p: 2,
                        minHeight: 'fit-content'
                    }
                    }
                >
                    <Typography level='h4' sx={{ mb: 0 }}>
                        Contacts - {contacts?.length ?? 0}
                    </Typography>
                    <Box sx={{ position: 'relative', width: {xs: 'calc(100vw - 64px)', sm: 'auto'} }}>
                        {/* Scroll Shadow Indicators */}
                        {showScrollButtons.left && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: '40px',
                                    background: 'linear-gradient(to right, var(--joy-palette-background-surface), transparent)',
                                    zIndex: 1,
                                    pointerEvents: 'none',
                                }}
                            />
                        )}
                        {showScrollButtons.right && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: '40px',
                                    background: 'linear-gradient(to left, var(--joy-palette-background-surface), transparent)',
                                    zIndex: 1,
                                    pointerEvents: 'none',
                                }}
                            />
                        )}

                        {/* Scroll Container */}
                        <Box
                            ref={containerRef}
                            onScroll={handleScroll}
                            sx={{
                                display: 'flex',
                                gap: 2,
                                overflowX: 'auto',
                                px: 1,
                                py: 2,
                                scrollbarWidth: 'none', // Firefox
                                '&::-webkit-scrollbar': {
                                    display: 'none' // Webkit
                                },
                                WebkitOverflowScrolling: 'touch',
                                scrollSnapType: 'x mandatory',
                                '& > *': {
                                    scrollSnapAlign: 'center',
                                },
                            }}
                        >
                            {progressItems.map((item, index) => (
                                <ProgressItem key={index} {...item} />
                            ))}
                        </Box>

                        {/* Scroll Buttons */}
                        {showScrollButtons.left && (
                            <Box
                                onClick={() => scroll('left')}
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '40px',
                                    height: '40px',
                                    display: { xs: 'none', sm: 'flex' },
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'background.surface',
                                    borderRadius: '50%',
                                    boxShadow: 'sm',
                                    cursor: 'pointer',
                                    zIndex: 2,
                                    '&:hover': {
                                        bgcolor: 'background.level1',
                                    },
                                }}
                            >
                                ←
                            </Box>
                        )}
                        {showScrollButtons.right && (
                            <Box
                                onClick={() => scroll('right')}
                                sx={{
                                    position: 'absolute',
                                    right: 0,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '40px',
                                    height: '40px',
                                    display: { xs: 'none', sm: 'flex' },
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'background.surface',
                                    borderRadius: '50%',
                                    boxShadow: 'sm',
                                    cursor: 'pointer',
                                    zIndex: 2,
                                    '&:hover': {
                                        bgcolor: 'background.level1',
                                    },
                                }}
                            >
                                →
                            </Box>
                        )}
                    </Box>
                </Sheet>
            }
        </CssVarsProvider >
    );
}
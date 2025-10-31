/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { CircularProgress } from '@mui/joy';
import { useContext, useMemo } from 'react';
import { generateMobilePagination } from '@/utils/pagination';
import { Pagination } from '@mui/material';
import { TeamContext } from '@/context/teamContext';
import MobileUserRow from './MobileUserRow';

export default function AIList({ rows, isLoading, totalRows,
    currentPage,
    setCurrentPage,
    enableCheckbox = false
}) {
    const {
        onAdd, onEdit, currentUser } = useContext(TeamContext);
    const loaderView = useMemo(() => {

        return (
            <Box sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // width: '160vh', height: '50vh',
            }}>
                <CircularProgress size='md' />
            </Box>
        )
    }, [isLoading])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const pagination = useMemo(() => {
        const count = generateMobilePagination(totalRows, currentPage, 7);
        return <Pagination count={count} page={currentPage} onChange={handleChange} size="small" />
    }, [totalRows, currentPage, handleChange, generateMobilePagination]);

    return (
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            {/* {isLoading ? loaderView :
                rows?.length === 0 ? <Box>
                    <Typography>No results found.</Typography>
                </Box>
                    : */}
                    <>
                        {rows?.map((listItem) => (
                            <MobileUserRow
                                onAdd={onAdd}
                                onEdit={onEdit}
                                listItem={listItem}
                                currentUser={currentUser}
                            />
                        ))}
                        {rows?.length > 0 &&
                            <Box sx={{ width: '100%', display: 'flex', flex: 1, justifyContent: 'center', py: 3 }}>
                                {pagination}
                            </Box>
                        }
                    </>
            {/* } */}
        </Box>
    );
}
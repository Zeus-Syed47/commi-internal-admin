'use client'

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

import { Typography, Link as JoyLink, useTheme } from '@mui/joy';
import { useContext } from 'react';
import { Add } from '@mui/icons-material';
import { PromptContext } from '@/context/promptContext';
import UsersList from '@/components/prompts/UserList';
import UsersTable from '@/components/prompts/UserTable';
import { useMediaQuery } from '@mui/material';


export default function AI(props: any) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { promptData,onEdit,onDelete } = useContext(PromptContext);
    console.log(promptData)
    return (
        <Box
            component="main"
            className="MainContent"
            sx={{
                px: { xs: 0, md: 6 },
                pt: {
                    xs: '2px',
                    sm: 'calc(12px + var(--Header-height))',
                    md: 3,
                },
                pb: { xs: 0, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '94dvh',
                gap: 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    // mb: 1,
                    gap: 1,
                    flexDirection: { xs: 'row', sm: 'row' },
                    alignItems: { xs: 'start', sm: 'center' },
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}
            >

                <Typography
                    color='primary'
                    //  sx={{
                    //     color: "#2BB673"
                    // }}
                    level={isMobile ? 'title-md' : 'h4'} >
                    AI Employees
                </Typography>
                {/* {currentUser?.type === 'admin' &&
                    <Box>
                        <Button
                            color='primary'
                            sx={{
                                ml: 2,
                                // backgroundColor: "#2BB673",
                            }}
                            startDecorator={<Add />}
                            size="sm"
                            onClick={() => {
                                onAddAIClick()
                            }}
                        >
                            Add AI Employee
                        </Button>
                    </Box>
                } */}
            </Box>
            <UsersTable
                rows={promptData ?? []}
                onEdit={onEdit}
                onDelete={onDelete}
                // isLoading={isCompanyUsersLoading}
                // searchKey={searchKey}
                // setSearchKey={setSearchKey}
                // search={search}
                // handleSearch={debouncedSearch}
                // totalRows={totalRows}
                // currentPage={currentPage}
                // setCurrentPage={setCurrentPage}

            />
            <UsersList rows={promptData ?? []} 
            // isLoading={isCompanyUsersLoading}
                // search={search}
                // handleSearch={debouncedSearch}
                // totalRows={totalRows}
                // currentPage={currentPage}
                // setCurrentPage={setCurrentPage}
            />
        </Box >
    )
}
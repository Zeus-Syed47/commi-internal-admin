/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Checkbox, CircularProgress } from '@mui/joy';
import { useMemo } from 'react';
import { generateMobilePagination } from '@/utils/pagination';
import { Pagination } from '@mui/material';
import { getRandomColor } from '@/utils/randomString';
import { getFormattedChip } from '@/utils/format/attributeChip';
import AvatarWithOrigin from '../AvatarWithOrigin';
import CheckboxButton from '../button/checkbox';
import { map } from 'lodash';


function RowMenu({ onEditRow, row, onDelete }) {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem onClick={() => onEditRow(row)}>Edit</MenuItem>
                <Divider />
                <MenuItem onClick={() => onDelete(row)} color="danger">Delete</MenuItem>
            </Menu>
        </Dropdown>
    );
}

export default function SyncContactsList({ rows, isLoading, totalRows,
    currentPage,
    setCurrentPage,
    updateItemCheck
}) {

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
            {isLoading ? loaderView :
                rows?.length === 0 ? <Box>
                    <Typography>No results found.</Typography>
                </Box>
                    :
                    <>
                        <Box sx={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',

                        }}>
                            <Typography level='title-lg' sx={{
                                mb: 2,
                            }}>Selected: {rows?.filter(row => row.checked).length}</Typography>
                            <Typography level='title-lg' sx={{
                                mb: 2
                            }}>Total: {rows?.length}</Typography>

                        </Box>
                        {rows?.map((listItem) => (
                            <List key={listItem.id} size="sm" sx={{ '--ListItem-paddingX': 0 }}>
                                <ListItem
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'start',
                                    }}
                                >
                                    <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                                        <ListItemDecorator>
                                            {/* <Avatar size="sm">{listItem?.name?.length ? listItem.name[0] : ''}</Avatar> */}
                                            <AvatarWithOrigin origin={listItem?.origin} />
                                        </ListItemDecorator>
                                        <div>
                                            <Typography gutterBottom sx={{ fontWeight: 600 }}>
                                                {listItem?.name}
                                            </Typography>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                // alignItems: 'center',
                                                // justifyContent: 'space-between',

                                            }}>
                                                {listItem.phone_number &&
                                                    <Typography level="body-xs" gutterBottom>
                                                        {listItem.phone_number}
                                                    </Typography>
                                                }


                                            </Box>
                                        </div>
                                    </ListItemContent>
                                    <CheckboxButton checked={listItem?.checked} onCheck={() => {
                                        updateItemCheck(listItem)
                                    }} />
                                </ListItem>
                                <ListDivider />
                            </List>
                        ))}
                        {rows?.length > 0 &&
                            <Box sx={{ width: '100%', display: 'flex', flex: 1, justifyContent: 'center', py: 3 }}>
                                {pagination}
                            </Box>
                        }
                    </>
            }
        </Box>
    );
}
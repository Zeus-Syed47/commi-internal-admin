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
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import moment from 'moment';
import { CircularProgress } from '@mui/joy';
import { useContext, useMemo } from 'react';
import { generateMobilePagination } from '@/utils/pagination';
import { Pagination } from '@mui/material';
import { getRandomColor } from '@/utils/randomString';
import { getFormattedChip } from '@/utils/format/attributeChip';
import RowMenu from './RowMenu';
import { TeamContext } from '@/context/teamContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MobileUserRow from './MobileUserRow';

export default function UsersList({ rows, isLoading, totalRows,
    currentPage,
    setCurrentPage,
    enableCheckbox = false
}) {
    const {
        isCompanyUsersLoading, onAdd, onEdit, onDelete, currentUser } = useContext(TeamContext);
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
            }
        </Box>
    );
}
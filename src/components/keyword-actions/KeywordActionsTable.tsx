/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import moment from 'moment';
import { useMemo } from 'react';
import { CircularProgress } from '@mui/joy';
import { getRandomColor } from '@/utils/randomString';
import { generateMobilePagination } from '@/utils/pagination';
import { Pagination } from '@mui/material';



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function RowMenu({ onRowDelete, row }) {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem>Edit</MenuItem>
                {/* <MenuItem>Rename</MenuItem> */}
                {/* <MenuItem>Move</MenuItem> */}
                <Divider />
                <MenuItem color="danger" onClick={(event) => {
                    onRowDelete(row);
                    event.stopPropagation();
                }}>Delete</MenuItem>
            </Menu>
        </Dropdown>
    );
}
export default function KeywordActionTable({ rows, isLoading, onRowDelete, onRowClick,
    setCurrentPage, totalRows, currentPage, handleSearch }) {
    const [order, setOrder] = React.useState<Order>('desc');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [open, setOpen] = React.useState(false);
    const renderFilters = () => (
        <React.Fragment>
            {/* <FormControl size="sm">
                <FormLabel>Status</FormLabel>
                <Select
                    size="sm"
                    placeholder="Filter by status"
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                >
                    <Option value="paid">Paid</Option>
                    <Option value="pending">Pending</Option>
                    <Option value="refunded">Refunded</Option>
                    <Option value="cancelled">Cancelled</Option>
                </Select>
            </FormControl> */}
            <FormControl size="sm">
                <FormLabel>Category</FormLabel>
                <Select size="sm" placeholder="All">
                    <Option value="VIP">VIP</Option>
                    <Option value="Area">Area</Option>
                    <Option value="Preference">Preference</Option>
                </Select>
            </FormControl>
            {/* <FormControl size="sm">
                <FormLabel>Customer</FormLabel>
                <Select size="sm" placeholder="All">
                    <Option value="all">All</Option>
                    <Option value="olivia">Olivia Rhye</Option>
                    <Option value="steve">Steve Hampton</Option>
                    <Option value="ciaran">Ciaran Murray</Option>
                    <Option value="marina">Marina Macdonald</Option>
                    <Option value="charles">Charles Fulton</Option>
                    <Option value="jay">Jay Hoper</Option>
                </Select>
            </FormControl> */}
        </React.Fragment>
    );

    const loaderView = useMemo(() => {

        return (
            <Box sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '160vh', height: '50vh',
            }}>
                <CircularProgress size='lg' />
            </Box>
        )
    }, [isLoading])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const pagination = useMemo(() => {
        const count = generateMobilePagination(totalRows, currentPage, 7);
        return <Pagination count={count} page={currentPage} onChange={handleChange} size="large" />
    }, [totalRows, currentPage, handleChange, generateMobilePagination]);

    return (
        <React.Fragment>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
            >
                <Input
                    size="sm"
                    placeholder="Search"
                    startDecorator={<SearchIcon />}
                    sx={{ flexGrow: 1 }}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {/* <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpen(true)}
                >
                    <FilterAltIcon />
                </IconButton> */}
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
                        <ModalClose />
                        <Typography id="filter-modal" level="h2">
                            Filters
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* {renderFilters()} */}
                            <Button color="primary" onClick={() => setOpen(false)}>
                                Submit
                            </Button>
                        </Sheet>
                    </ModalDialog>
                </Modal>
            </Sheet>
            {/* {rows?.length > 0 && */}
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: { xs: 'none', sm: 'flex' },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' },
                    },
                }}
            >
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Search for keyword actions</FormLabel>
                    <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </FormControl>
                {/* {renderFilters()} */}
            </Box>
            {/* } */}
            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0 //'70vh',
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px',
                    }}
                >
                    <thead>
                        <tr>
                            {/* <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                                <Checkbox
                                    size="sm"
                                    indeterminate={
                                        selected.length > 0 && selected.length !== rows.length
                                    }
                                    checked={selected.length === rows.length}
                                    onChange={(event) => {
                                        setSelected(
                                            event.target.checked ? rows.map((row) => row.id) : [],
                                        );
                                    }}
                                    color={
                                        selected.length > 0 || selected.length === rows.length
                                            ? 'primary'
                                            : undefined
                                    }
                                    sx={{ verticalAlign: 'text-bottom' }}
                                />
                            </th> */}
                            {/* <th style={{ width: 120, padding: '12px 6px' }}>
                                <Link
                                    underline="none"
                                    color="primary"
                                    component="button"
                                    onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                                    endDecorator={<ArrowDropDownIcon />}
                                    sx={[
                                        {
                                            fontWeight: 'lg',
                                            '& svg': {
                                                transition: '0.2s',
                                                transform:
                                                    order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                            },
                                        },
                                        order === 'desc'
                                            ? { '& svg': { transform: 'rotate(0deg)' } }
                                            : { '& svg': { transform: 'rotate(180deg)' } },
                                    ]}
                                >
                                    Invoice
                                </Link>
                            </th> */}
                            <th style={{ width: 90, padding: '12px 6px' }}>Keyword Action Name</th>
                            <th style={{ width: 30, padding: '12px 6px' }}>Type</th>

                            <th style={{ width: 280, padding: '12px 6px' }}>Keywords</th>
                            <th style={{ width: 30, padding: '12px 6px' }}>Created date</th>

                            <th style={{ width: 30, padding: '12px 6px' }}> </th>
                        </tr>
                    </thead>
                    {isLoading ? loaderView :

                        rows?.length === 0 ? <tbody>
                            <tr>
                                <td >No results found.</td>
                            </tr>
                        </tbody>
                            :

                            <tbody>
                                {[...rows].sort(getComparator(order, 'createdAt')).map((row) => (
                                    <tr key={row.id} onClick={() => onRowClick(row)} style={{ cursor: 'pointer' }}>
                                        {/* <td style={{ textAlign: 'center', width: 120 }}>
                                    <Checkbox
                                        size="sm"
                                        checked={selected.includes(row.id)}
                                        color={selected.includes(row.id) ? 'primary' : undefined}
                                        onChange={(event) => {
                                            setSelected((ids) =>
                                                event.target.checked
                                                    ? ids.concat(row.id)
                                                    : ids.filter((itemId) => itemId !== row.id),
                                            );
                                        }}
                                        slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                                        sx={{ verticalAlign: 'text-bottom' }}
                                    />
                                </td> */}
                                        <td>
                                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

                                                <Typography level="body-xs">{row.name}</Typography>

                                            </Box>
                                        </td>
                                        <td>
                                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

                                                <Typography level="body-xs">{row.type}</Typography>

                                            </Box>
                                        </td>
                                        <td>
                                            {
                                                row?.keywords?.map(keyword => <Chip
                                                    variant="soft"
                                                    size="sm"
                                                    color={`${getRandomColor()}`}
                                                    sx={{
                                                        mr: 1
                                                    }}
                                                >
                                                    {keyword}
                                                </Chip>)

                                            }

                                        </td>

                                        <td>
                                            <Typography level="body-xs">{moment(row.createdAt).format('MMM D, YYYY')}</Typography>
                                        </td>

                                        <td>
                                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                {/* <Link level="body-xs" component="button">
                                            Download
                                        </Link> */}
                                                <RowMenu onRowDelete={onRowDelete} row={row} />
                                            </Box>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    }
                </Table>
            </Sheet>
            {
                rows?.length > 0 &&
                <Box
                    className="Pagination-laptopUp"
                    sx={{
                        pt: 2,
                        gap: 1,
                        [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                        display: {
                            xs: 'none',
                            md: 'flex',
                        },
                        flex: 1, justifyContent: 'center',
                    }}
                >
                    {pagination}
                </Box>
            }
        </React.Fragment>
    );
}
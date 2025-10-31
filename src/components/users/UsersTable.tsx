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
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { Autocomplete, CircularProgress, colors } from '@mui/joy';
import { generateMobilePagination, generatePagination } from '@/utils/pagination';
import { Pagination } from '@mui/material';
import UsersTableView from './UsersTableView';



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

export function getComparator<Key extends keyof any>(
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

export default function UsersTable({
    rows,
    isLoading,
    enableCheckbox = false,
    onRowsSelected,
    handleSearch,
    search,
    searchKey,
    setSearchKey,
    totalRows,
    currentPage,
    setCurrentPage,
    onFilterChange,
    attributes,
    filterConditions,
    filter,
    debouncedFilterSearch,
    inputRef,
    inputFilterRef
}) {
    const [order, setOrder] = React.useState<Order>('desc');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (onRowsSelected) {
            onRowsSelected(selected)
        }
    }, [selected]);

    const renderFilters = (inputFilterRef) => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>Attribute</FormLabel>
                <Autocomplete size="sm"
                    value={filter?.attribute}
                    getOptionLabel={option => option?.name}
                    placeholder="Attribute" options={attributes}
                    onChange={(e, v) => onFilterChange({ key: 'attribute', value: v })}
                />
            </FormControl>

            <FormControl size="sm">
                <FormLabel>Condition</FormLabel>
                <Autocomplete size="sm"
                    value={filter?.condition}
                    getOptionLabel={option => option?.label}
                    placeholder="Filter by status"
                    options={filterConditions}
                    onChange={(e, v) => onFilterChange({ key: 'condition', value: v })}
                />
            </FormControl>

            <FormControl size="sm">
                <FormLabel>value</FormLabel>
                <Input placeholder='value' ref={inputFilterRef}
                    // value={filter?.value}
                    onChange={(e) => debouncedFilterSearch({ key: 'value', value: e.target.value })}
                />
            </FormControl>
        </React.Fragment>
    );

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const pagination = useMemo(() => {
        const count = generateMobilePagination(totalRows, currentPage, 7);
        return <Pagination count={count} page={currentPage} onChange={handleChange} size="large" />
    }, [totalRows, currentPage, handleChange, generateMobilePagination]);

    //     if (paginations.length < 2) return null
    //     return (
    //         <Box
    //             className="Pagination-laptopUp"
    //             sx={{
    //                 pt: 2,
    //                 gap: 1,
    //                 [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
    //                 display: {
    //                     xs: 'none',
    //                     md: 'flex',
    //                 },
    //             }}
    //         >
    //             <Button
    //                 size="sm"
    //                 variant="outlined"
    //                 color="neutral"
    //                 startDecorator={<KeyboardArrowLeftIcon />}
    //                 onClick={() => {
    //                     if (currentPage > 1) {
    //                         setCurrentPage(currentPage - 1)
    //                     }
    //                 }}
    //             >
    //                 Previous
    //             </Button>

    //             <Box sx={{ flex: 1 }} />
    //             {paginations?.map((page) => (
    //                 <IconButton
    //                     key={page}
    //                     size="sm"
    //                     variant={Number(page) ? 'outlined' : 'plain'}
    //                     color="neutral"
    //                 >
    //                     {page}
    //                 </IconButton>
    //             ))}
    //             <Box sx={{ flex: 1 }} />
    //             <Button
    //                 size="sm"
    //                 variant="outlined"
    //                 color="neutral"
    //                 endDecorator={<KeyboardArrowRightIcon />}
    //                 onClick={() => {
    //                     if (paginations?.length > currentPage) {
    //                         setCurrentPage(currentPage + 1)
    //                     }
    //                 }}
    //             >
    //                 Next
    //             </Button>
    //         </Box>
    //     )
    // }, [totalRows, currentPage, generatePagination, setCurrentPage]);

    return (
        <React.Fragment>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
            >
                <Input
                    ref={inputRef}
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
                            {/* {renderFilters(inputFilterRef)} */}
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
                {/* <FormControl size="sm">
                    <FormLabel>Column</FormLabel>
                    <Autocomplete size="sm"
                        placeholder="Choose a column"
                        options={[{ value: 'name', label: 'Name' }, { value: 'phone_number', label: 'Phone Number' }]}
                        value={searchKey}
                        onChange={(e, v) => setSearchKey(v)}
                    />
                </FormControl> */}
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Search for users</FormLabel>
                    <Input size="sm"

                        ref={inputRef}
                        placeholder="Search"
                        startDecorator={<SearchIcon />}
                        // value={search}
                        onChange={(e) => handleSearch(e.target.value)} />
                </FormControl>
                {/* {renderFilters(inputFilterRef)} */}
            </Box>
            {/* } */}
            <Sheet
                className="OrderTableContainer"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0 //'70vh'
                }}
            >
                <UsersTableView
                    enableCheckbox={enableCheckbox}
                    selected={selected}
                    setSelected={setSelected}
                    isLoading={isLoading}
                    rows={rows}
                    order={order}
                />
            </Sheet>
            {rows?.length > 0 &&
                <Box sx={{
                    width: '100%', display: 'flex', flex: 1, justifyContent: 'center', mt: 4, pr: 18, display: {
                        xs: 'none',
                        md: 'flex',
                    },
                }}>
                    {pagination}
                </Box>
            }
        </React.Fragment>
    );
}
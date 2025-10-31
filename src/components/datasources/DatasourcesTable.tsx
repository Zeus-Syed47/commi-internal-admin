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
import { useEffect, useMemo } from 'react';
import { Autocomplete, CircularProgress, colors } from '@mui/joy';
import { generateMobilePagination, generatePagination } from '@/utils/pagination';
import { Pagination } from '@mui/material';
import { getRandomColor } from '@/utils/randomString';
import { getFormattedChip } from '@/utils/format/attributeChip';
import ContactAttributes from '../contact-attributes';
import AvatarWithOrigin from '../AvatarWithOrigin';
import _ from 'lodash';
import DeleteConfirmation from '../delete/DeleteMenu';
import TableSkeleton from './TableSkeleton';



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

function RowMenu({ onEdit, row, onDelete, setOpenDelete }) {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem onClick={() => onEdit(row)}>Edit</MenuItem>
                {/* <MenuItem>Rename</MenuItem> */}
                {/* <MenuItem>Move</MenuItem> */}
                <Divider />
                <MenuItem onClick={() => setOpenDelete(row)} color="danger">Delete</MenuItem>
            </Menu>
        </Dropdown>
    );
}
export default function DatasourceTable({
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
    onEdit,
    onDelete,
    isContactDeleting,
    onFilterChange,
    attributes,
    filterConditions,
    debouncedFilterSearch,
    inputRef,
    inputFilterRef,
    addAttributeButtonHandler,
    removeAttributeButtonHandler,
    filters,
    onFilterInputChange, filterInputs,
    openDelete, setOpenDelete
}) {
    const [order, setOrder] = React.useState<Order>('desc');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (onRowsSelected) {
            onRowsSelected(selected)
        }
    }, [selected]);

    const renderFilters = useMemo(() => {
        if (!filters || filters.length === 0) return null
        const filter = filters[0];
        return <React.Fragment>
            <FormControl size="sm">
                <FormLabel>Attribute</FormLabel>
                <Autocomplete size="sm"
                    value={filter?.attribute}
                    getOptionLabel={option => option?.name}
                    placeholder="Attribute" options={attributes}
                    onChange={(e, v) => onFilterChange({ key: 'attribute', value: v, index: 0 })}
                />
            </FormControl>

            <FormControl size="sm">
                <FormLabel>Condition</FormLabel>
                <Autocomplete size="sm"
                    value={filter?.condition}
                    getOptionLabel={option => option?.label}
                    placeholder="Filter by status"
                    options={filterConditions}
                    onChange={(e, v) => onFilterChange({ key: 'condition', value: v, index: 0 })}
                />
            </FormControl>

            <FormControl size="sm">
                <FormLabel>value</FormLabel>
                <Input placeholder='value'
                    // ref={inputFilterRef}
                    value={filterInputs[0]?.value ?? ''}
                    onChange={(e) => {
                        onFilterInputChange({ key: 'value', value: e.target.value, index: 0 })
                        debouncedFilterSearch({ key: 'value', value: e.target.value, index: 0 })
                    }}
                />
            </FormControl>
            <IconButton
                sx={{
                    height: 20,
                    width: 20,
                    alignSelf: 'flex-end',
                }}
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => setOpen(true)}
            >
                <FilterAltIcon />
            </IconButton>
        </React.Fragment>
    }, [filters, attributes, filterInputs]);

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

    const searchInputHandler = (event) => {
        handleChange(event, Number(event?.target?.value ?? 1))
    }

    const debouncedInput = _.debounce(searchInputHandler, 1000)


    const pagination = useMemo(() => {
        const count = generateMobilePagination(totalRows, currentPage, 7);
        return <Box sx={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
        }}>
            <Pagination count={count} page={currentPage} onChange={handleChange} size="large" />
            <Box sx={{
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center',
                ml: 10,
                position: 'absolute',
                right: 0,
            }}>
                <Typography mr={1} fontSize={'15px'}>
                    Goto:
                </Typography>
                <Input sx={{
                    width: 50,
                    minHeight: 0,
                    height: '32px',
                }}
                    // value={currentPage}
                    onChange={debouncedInput}
                />
            </Box>
        </Box>
    }, [totalRows, currentPage, handleChange, generateMobilePagination, debouncedInput]);

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
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpen(true)}
                >
                    <FilterAltIcon />
                </IconButton>

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
                    <FormLabel>Search for datasources</FormLabel>
                    <Input size="sm"

                        ref={inputRef}
                        placeholder="Search"
                        startDecorator={<SearchIcon />}
                        // value={search}
                        onChange={(e) => handleSearch(e.target.value)} />
                </FormControl>
                {renderFilters}
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
                {
                    isLoading ? <TableSkeleton columnCount={3} /> :
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
                                    {enableCheckbox &&
                                        <th style={{ width: 28, textAlign: 'center', padding: '12px 6px' }}>
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
                                        </th>
                                    }
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
                                    <th style={{ width: 90, padding: '12px 6px' }}>Name</th>

                                    <th style={{ width: 180, padding: '12px 6px' }}>Description</th>
                                    <th style={{ width: 100, padding: '12px 6px' }}>Upload status</th>

                                    <th style={{ width: 40, padding: '12px 6px' }}>Created date</th>
                                    {!enableCheckbox &&
                                        <th style={{ width: 30, padding: '12px 6px' }}> </th>
                                    }
                                </tr>
                            </thead>
                            {rows?.length === 0 ? <tbody>
                                <tr>
                                    <td >No results found.</td>
                                </tr>
                            </tbody>
                                :
                                <tbody>
                                    {[...rows].sort(getComparator(order, 'createdAt')).map((row) => (
                                        <tr key={row.id}>
                                            {enableCheckbox &&
                                                <td style={{ textAlign: 'center', width: 80 }}>
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
                                                </td>
                                            }
                                            <td>
                                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

                                                    <Typography level="body-xs">{row?.name ?? ''}</Typography>

                                                </Box>
                                            </td>
                                            <td>
                                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

                                                    <Typography level="body-xs">{row?.description ?? ''}</Typography>

                                                </Box>
                                            </td>
                                            <td>
                                                <Chip
                                                    variant="soft"
                                                    size="sm"
                                                    color={'success'}
                                                    sx={{
                                                        mr: 1
                                                    }}
                                                >
                                                    {row?.data_processing_status}
                                                </Chip>

                                            </td>

                                            <td>
                                                <Typography level="body-xs">{moment(row.createdAt).format('MMM D, YYYY')}</Typography>
                                            </td>
                                            {!enableCheckbox &&
                                                <td>
                                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                        {/* <Link level="body-xs" component="button">
                                            Download
                                        </Link> */}
                                                        <RowMenu onEdit={onEdit} onDelete={onDelete} row={row} setOpenDelete={setOpenDelete} />
                                                    </Box>
                                                </td>
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            }
                        </Table>
                }
            </Sheet>
            {rows?.length > 0 &&
                <Box sx={{
                    width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', display: {
                        xs: 'none',
                        md: 'flex',
                    },
                }}>
                    {pagination}
                </Box>
            }

            {
                openDelete &&
                <DeleteConfirmation
                    open={openDelete}
                    setOpen={setOpenDelete}
                    onDeleteConfirmed={() => {
                        onDelete(openDelete)
                    }}
                    isDeleting={isContactDeleting}
                />
            }
        </React.Fragment>
    );
}
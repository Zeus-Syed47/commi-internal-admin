import * as React from 'react';
import Box from '@mui/material/Box';
import { Breadcrumbs, Button, Typography, Link as JoyLink } from '@mui/joy';
import { Delete, DocumentScanner, Remove, UploadFile, UploadRounded } from '@mui/icons-material';
import useContacts from '@/hooks/useContacts';
import ContactTable from '@/components/contacts/ContactsTable';
import ContactList from '@/components/contacts/ContactsList';
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { BroadcastContext } from '@/context/broadcastContext';


export default function BroadcastContacts() {

    const { contacts,
        isLoading, debouncedSearch, search, searchKey,
        setSearchKey, totalRows, currentPage, setCurrentPage,
        onFilterChange, attributes, filterConditions,
        debouncedFilterSearch, inputRef, inputFilterRef,
        addAttributeButtonHandler,
        removeAttributeButtonHandler,
        filters, filterInputs,
        onFilterInputChange,
    } = useContacts({
        forBroadcast: true
    })

    const { updateBroadcastFields, broadcastValues } = useContext(BroadcastContext);


    const handleSelectedRows = useCallback((rows) => {
        updateBroadcastFields({
            value: rows,
            key: 'contacts'
        })
    }, [updateBroadcastFields]);



    const isFilterApplied = useMemo(
        () =>
            filters?.some(
                (filter) =>
                    Object.keys(filter?.attribute ?? {})?.length > 0 &&
                    filter?.value &&
                    Object.keys(filter?.condition ?? {})?.length > 0
            ),
        [filters]
    );

    useEffect(() => {
        if (totalRows > 0) {
            if (isFilterApplied) {
                updateBroadcastFields({
                    value: filters,
                    key: 'filter'
                })

                updateBroadcastFields({
                    value: null,
                    key: 'search'
                })
            }
            else if (search) {
                updateBroadcastFields({
                    value: search,
                    key: 'search'
                })

                updateBroadcastFields({
                    value: null,
                    key: 'filter'
                })
            }
        }
        else {
            updateBroadcastFields({
                value: null,
                key: 'filter'
            })

            updateBroadcastFields({
                value: null,
                key: 'search'
            })
        }
    }, [totalRows, filters, search, isFilterApplied]);

    return (
        <Box
            component="main"
            className="MainContent"
            sx={{
                px: { xs: 2, md: 6 },
                pt: {
                    xs: '6px',
                    sm: 'calc(2px + var(--Header-height))',
                    md: 3,
                },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '94dvh',
                gap: 1,
            }}
        >
            {!broadcastValues?.contacts?.length && !isFilterApplied &&
                <Box
                    sx={{
                        display: 'flex',
                        // mb: 1,
                        gap: 1,
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'start', sm: 'center' },
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}
                >

                    {broadcastValues?.contactFile ?
                        <Box sx={{}}>
                            <Typography level='title-md' sx={{
                                mb: 1
                            }}>{'File'}</Typography>
                            <Button variant='soft' startDecorator={<Delete />} component="span"
                                onClick={() => {
                                    updateBroadcastFields({ key: 'contactFile', value: null });
                                }}
                            >
                                {broadcastValues?.contactFile?.name}
                            </Button>
                        </Box>
                        :
                        <Box sx={{}}>
                            <Typography level='title-md' sx={{
                                mb: 1
                            }}>{'Choose a file'}</Typography>
                            <input
                                accept='.xls,.xlsx,.csv'
                                type='file'
                                id='select-image'
                                style={{ display: "none" }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.files !== null) {
                                        updateBroadcastFields({ key: 'contactFile', value: e.target.files[0] });
                                    }
                                }}
                            />
                            <label htmlFor='select-image'>
                                <Button variant='soft' startDecorator={<UploadFile />} component="span">
                                    UPLOAD LIST
                                </Button>
                            </label>
                        </Box>
                    }
                </Box>
            }
            {!broadcastValues?.contactFile && !broadcastValues?.contacts?.length && !isFilterApplied &&
                <Typography level='title-lg' sx={{
                    py: 2,
                }}>{'OR'}</Typography>
            }
            {!broadcastValues?.contactFile &&
                <>
                    <Typography level='title-md' sx={{
                        mb: 1
                    }}>{isFilterApplied || broadcastValues?.contacts?.length ?
                        `${broadcastValues?.contacts?.length ? 'Selected contacts' : 'Available contacts'}
                        : ${broadcastValues?.contacts?.length ? broadcastValues?.contacts?.length : isFilterApplied ? totalRows : 0}`
                        : 'Select or filter contacts'}</Typography>
                    <ContactTable
                        enableCheckbox
                        onRowsSelected={handleSelectedRows}
                        rows={contacts ?? []}
                        isLoading={isLoading}
                        searchKey={searchKey}
                        setSearchKey={setSearchKey}
                        search={search}
                        handleSearch={debouncedSearch}
                        totalRows={totalRows}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        onFilterChange={onFilterChange}
                        attributes={attributes}
                        filterConditions={filterConditions}
                        debouncedFilterSearch={debouncedFilterSearch}
                        inputRef={inputRef}
                        inputFilterRef={inputFilterRef}
                        addAttributeButtonHandler={addAttributeButtonHandler}
                        removeAttributeButtonHandler={removeAttributeButtonHandler}
                        filters={filters}
                        filterInputs={filterInputs}
                        onFilterInputChange={onFilterInputChange}
                    />
                    <ContactList rows={contacts ?? []} isLoading={isLoading}
                        search={search}
                        handleSearch={debouncedSearch}
                        totalRows={totalRows}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        enableCheckbox
                    />
                </>
            }
        </Box>
    )
}
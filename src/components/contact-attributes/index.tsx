import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import { Autocomplete, Box, Button, Divider, FormControl, FormLabel, IconButton, Input, Modal, ModalClose, ModalDialog, Typography, useTheme } from '@mui/joy';
import { ChatProps } from '../types';
import { useMemo } from 'react';
import { Add, Delete } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';

type ChatsPaneProps = {
    chats: ChatProps[];
    setSelectedChat: (chat: ChatProps) => void;
    selectedChatId: string;
};

export default function ContactAttributes(props: ChatsPaneProps) {
    const { filters, onFilterChange, filterConditions,
        attributes, debouncedFilterSearch, open, setOpen,
        removeAttributeButtonHandler,
        addAttributeButtonHandler, onFilterInputChange, filterInputs
    } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const renderFilters = useMemo(() => {

        return (
            <Box>
                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                }}>
                    <Button
                        onClick={() => addAttributeButtonHandler()}
                        variant='plain'
                        startDecorator={<Add />}>
                        Add Segment
                    </Button>
                </Box>
                {
                    filters?.map((filter, index) =>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: {
                                sm: 'row',
                                xs: 'column'
                            },
                            mt: {
                                xs: index === 0 ? 0 : 4,
                                sm: index === 0 ? 0 : 2
                            }
                        }}>
                            <FormControl size="sm">
                                <FormLabel>Attribute</FormLabel>
                                <Autocomplete size="sm"
                                    value={filter?.attribute}
                                    getOptionLabel={option => option?.name}
                                    placeholder="Attribute" options={attributes}
                                    onChange={(e, v) => onFilterChange({ key: 'attribute', value: v, index })}
                                />
                            </FormControl>

                            <FormControl size="sm" sx={{
                                mx: {
                                    sm: 2,
                                    xs: 0
                                },
                                my: {
                                    sm: 0,
                                    xs: 2
                                }
                            }}>
                                <FormLabel>Condition</FormLabel>
                                <Autocomplete size="sm"
                                    value={filter?.condition}
                                    getOptionLabel={option => option?.label}
                                    placeholder="Filter by status"
                                    options={filterConditions}
                                    onChange={(e, v) => onFilterChange({ key: 'condition', value: v, index })}
                                />
                            </FormControl>

                            <FormControl size="sm">
                                <FormLabel>Value</FormLabel>
                                <Input placeholder='value'
                                    // ref={inputFilterRef}
                                    value={filterInputs[index]?.value}
                                    onChange={(e) => {
                                        onFilterInputChange({ key: 'value', value: e.target.value, index })
                                        debouncedFilterSearch({ key: 'value', value: e.target.value, index })
                                    }}
                                />
                            </FormControl>
                            {index !== 0 && <IconButton
                                onClick={() => removeAttributeButtonHandler(index)}>
                                <Delete />
                            </IconButton>
                            }
                        </Box>
                    )
                }
            </Box>
        )
    }, [filters, addAttributeButtonHandler,
        removeAttributeButtonHandler,
        attributes, filterConditions,
        onFilterChange, debouncedFilterSearch, filterInputs]);

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <ModalDialog
                // aria-labelledby="filter-modal"
                layout={isMobile ? "fullscreen" : 'center'}
            >
                <ModalClose />
                <Typography level="title-lg">
                    Filters
                </Typography>
                <Divider sx={{ my: 0 }} />
                <Sheet sx={{
                    display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: {
                        xs: 650
                    }
                }}>
                    {renderFilters}
                    <Button color="primary"
                        onClick={() => setOpen(false)}
                    >
                        Submit
                    </Button>
                </Sheet>
            </ModalDialog>
        </Modal>
    );
}

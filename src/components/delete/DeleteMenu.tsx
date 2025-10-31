import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Divider from '@mui/joy/Divider';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useMediaQuery } from '@mui/material';

export default function DeleteConfirmation(props) {
    const { open, setOpen, onDeleteConfirmed, isDeleting } = props;
    const [itemToDelete, setItemToDelete] = React.useState<string | null>(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    // Sample items that can be deleted
    const items = [
        { id: '1', name: 'Project Alpha' }
    ];

    const handleDeleteClick = (itemId: string, itemName: string) => {
        setItemToDelete(itemName);
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        onDeleteConfirmed();
    };

    return (
        <CssVarsProvider>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Modal open={open} onClose={handleCancel}>
                    <ModalDialog
                        variant="outlined"
                        role="alertdialog"
                        aria-labelledby="delete-confirmation-title"
                        aria-describedby="delete-confirmation-description"
                        sx={{
                            width: isMobile ? '90%' : '400px',
                            borderRadius: 'md',
                            p: { xs: 2, sm: 3 },
                            boxShadow: 'lg',
                            animation: 'fadeIn 0.3s',
                            '@keyframes fadeIn': {
                                from: { opacity: 0, transform: 'translateY(10px)' },
                                to: { opacity: 1, transform: 'translateY(0)' },
                            },
                        }}
                    >
                        <Typography
                            id="delete-confirmation-title"
                            level="h2"
                            startDecorator={
                                <WarningRoundedIcon sx={{ color: 'warning.300' }} />
                            }
                            sx={{ mb: 2, alignItems: 'flex-start', gap: 1 }}
                        >
                            Confirm Deletion
                        </Typography>
                        <Divider />
                        <Typography id="delete-confirmation-description" sx={{ my: 2 }}>
                            Are you sure you want to delete <strong>{open?.name || open?.first_name}</strong>?
                            This action cannot be undone.
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                                gap: 1,
                                justifyContent: 'flex-end',
                                mt: 2,
                            }}
                        >
                            <Button
                                variant="plain"
                                color="neutral"
                                onClick={handleCancel}
                                disabled={isDeleting}
                                sx={{ order: isMobile ? 2 : 1 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="solid"
                                color="danger"
                                onClick={handleConfirmDelete}
                                loading={isDeleting}
                                loadingPosition="start"
                                startDecorator={isDeleting ? null : <DeleteOutlineRoundedIcon />}
                                sx={{ order: isMobile ? 1 : 2 }}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </Box>
                    </ModalDialog>
                </Modal>
            </Box>
        </CssVarsProvider>
    );
}
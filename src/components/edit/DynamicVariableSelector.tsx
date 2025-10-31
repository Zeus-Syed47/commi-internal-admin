import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';

const ColorSchemeToggle = () => {
    const { mode, setMode } = useColorScheme();
    return (
        <Button
            variant="plain"
            color="neutral"
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            startDecorator={mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
        >
            {mode === 'dark' ? 'Light' : 'Dark'} mode
        </Button>
    );
};

export default function AdaptiveModalMenu(props) {

    const { onSelect, openDynamicVariableSelector, setOpenDynamicVariableSelector } = props;
    const isMobile = useMediaQuery('(max-width:600px)');

    const items = ["name", "first_name", "last_name"]

    return (
        <CssVarsProvider defaultMode="system">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>

                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={openDynamicVariableSelector}
                    onClose={() => setOpenDynamicVariableSelector(false)}
                    sx={{
                        display: 'flex',
                        justifyContent: isMobile ? 'flex-end' : 'center',
                        alignItems: isMobile ? 'stretch' : 'center',
                    }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            maxWidth: isMobile ? 300 : 500,
                            width: isMobile ? 300 : '80%',
                            height: isMobile ? '100%' : 'auto',
                            maxHeight: isMobile ? '100vh' : '80vh',
                            borderRadius: isMobile ? '0 0 0 0' : 'md',
                            p: { xs: 2, sm: 3 },
                            boxShadow: 'lg',
                            overflowY: 'auto',
                            transition: 'transform 0.3s ease',
                            animation: isMobile
                                ? 'slideIn 0.3s forwards'
                                : 'fadeIn 0.3s forwards',
                            '@keyframes slideIn': {
                                from: { transform: 'translateX(100%)' },
                                to: { transform: 'translateX(0)' }
                            },
                            '@keyframes fadeIn': {
                                from: { opacity: 0 },
                                to: { opacity: 1 }
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography
                                component="h2"
                                id="modal-title"
                                level="h4"
                                textColor="inherit"
                                fontWeight="lg"
                            >
                                Menu
                            </Typography>
                            <ModalClose />
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <List
                            size={isMobile ? "lg" : "md"}
                            sx={{
                                '--ListItem-radius': '8px',
                                '--ListItemDecorator-size': '32px',
                                '--ListItem-paddingY': isMobile ? '12px' : '8px',
                            }}
                        >
                            {
                                items?.map(item => <ListItem>
                                    <ListItemButton onClick={() => onSelect(item)}>
                                        <ListItemContent>{item}</ListItemContent>
                                    </ListItemButton>
                                </ListItem>)
                            }
                        </List>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: isMobile ? 2 : 0,
                            justifyContent: 'space-between',
                            alignItems: isMobile ? 'stretch' : 'center'
                        }}>
                            {isMobile && (
                                <Button
                                    variant="solid"
                                    color="primary"
                                    onClick={() => setOpenDynamicVariableSelector(false)}
                                    fullWidth
                                >
                                    Close
                                </Button>
                            )}
                        </Box>
                    </Sheet>
                </Modal>
            </Box>
        </CssVarsProvider>
    );
}
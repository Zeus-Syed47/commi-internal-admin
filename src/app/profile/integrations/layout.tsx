'use client'
import OTP from "@/components/Otp";
import { IntegrationContext } from "@/context/integrationContext";
import useIntegrations from "@/hooks/useIntegrations";
import { Box, Button, CircularProgress, Grid, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";

export default function IntegrationsLayout({ children }) {

    const { currentUser, isTokenExchanging, isWABAUserOnboarding,
        isFBUserOnboarding, initiateFBOnboarding, pin, setPin, openModal, setOpenModal,
        selectedIntegration, setSelectedIntegration, isMobile,
        isPhoneRegistering, initiateRegisterPhone, onBoardFBUser, mutate, mockInstLogin,
        isFBUserMockOnboarding, deleteFbLogin, deleteInstaLogin, isFBLoginDeleting,
        isInstaLoginDeleting
    } = useIntegrations();


    return (<IntegrationContext.Provider
        value={{
            currentUser,
            isTokenExchanging,
            isWABAUserOnboarding,
            isFBUserOnboarding,
            initiateFBOnboarding,
            pin, setPin, openModal, setOpenModal,
            selectedIntegration, setSelectedIntegration,
            isMobile, isPhoneRegistering, initiateRegisterPhone,
            onBoardFBUser, mutate, mockInstLogin, isFBUserMockOnboarding,
            deleteFbLogin, deleteInstaLogin, isFBLoginDeleting,
            isInstaLoginDeleting
        }}
    >
        <Grid 
        
        sx={{ p: 3, overflow: 'auto' }}>
            {children}
        </Grid>
        <Modal
            layout={isMobile ? "fullscreen" : 'center'}
            open={openModal} onClose={() => setOpenModal('')} sx={{ zIndex: 10000 }}>
            <ModalDialog
                aria-labelledby="pre-requirements-modal-title"
                aria-describedby="pre-requirements-modal-description"
                sx={{
                    maxWidth: {
                        xs: 400,
                        sm: 500
                    }
                }}
            >
                <ModalClose />
                {openModal === 'integration' ?
                    <>
                        <Typography id="pre-requirements-modal-title" component="h2" level="h4" fontWeight="lg" mb={1}>
                            {selectedIntegration?.name} Pre-requirements
                        </Typography>
                        <Typography id="pre-requirements-modal-description" textColor="text.tertiary">
                            Before setting up the {selectedIntegration?.name} integration, please ensure you have the following:
                        </Typography>
                        <Box component="ul" sx={{ mt: 2, pl: 3 }}>
                            {selectedIntegration?.preRequisites.split('\n').map((req, index) => (
                                <Box component="li" key={index} sx={{ mb: 1 }}>
                                    {req.substring(2)}
                                </Box>
                            ))}
                        </Box>
                    </>
                    :
                    <>
                        <Typography id="pre-requirements-modal-title" component="h2" level="h4" fontWeight="lg" mb={1}>
                            Enter PIN
                        </Typography>
                        <Typography id="pre-requirements-modal-description" textColor="text.tertiary">
                            Last step! Set a 6 digit pin to register your phone number to meta
                        </Typography>
                        <Box component="ul" sx={{
                            display: 'flex', alignItems: 'center',
                            mt: 2, pl: 3, flexDirection: {
                                sm: 'row',
                                xs: 'column',
                            }
                        }}>
                            <OTP separator={<span>-</span>} value={pin} onChange={setPin} length={6} isMobile={isMobile} />
                            {isPhoneRegistering &&
                                <CircularProgress size="sm" sx={{
                                    ml: {
                                        sm: 2,
                                        xs: 0
                                    },
                                    mt: {
                                        sm: 0,
                                        xs: 2
                                    }
                                }} />
                            }
                        </Box>
                    </>
                }
            </ModalDialog>
        </Modal>
    </IntegrationContext.Provider>
    )

}

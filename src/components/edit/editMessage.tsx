import React, { Fragment } from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/joy/Typography';

import Header from './header';
import Body from './body';
import Footer from './footer';
import Buttons from './buttons';
import TemplateName from './name';
import { Button, Card, CardContent, Grid } from '@mui/joy';
import { CardHeader } from '@mui/material';
import { LoadingButton } from '@mui/lab';

function EditMessage(props) {

    const DynamicView = props?.selectedNodeType ? Fragment : Card;
    const DynamicSubView = props?.selectedNodeType ? Fragment : CardContent;

    return (
        <>
            <Paper variant="outlined" sx={[{
                width: '760px',
                maxHeight: '90vh', // Constrain the height
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#FFFFFF',
                boxShadow: '1px 0px 0px rgba(0, 0, 0, 0.08)',
                padding: '10px',
                // border: '1px solid black',
                overflowY: 'auto' // Enable vertical scrolling
            }, props?.rootRootStyle]}>
                {!props?.isCreateFlow && <Box sx={[{
                    width: '680px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                    padding: '2px',
                    // border: '1px solid black'
                }, props?.rootStyle]}>
                    <Typography fontSize={'24px'} fontWeight={400} sx={{}}>
                        {props?.selectedNodeType ? 'Set Question' : 'Create Template'}
                    </Typography>
                    <IconButton
                        onClick={props?.onClose}
                        sx={{
                            width: '40px',
                            height: '40px',
                            background: '#F5F5F5',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: '100px',
                        }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                }
                {!props?.selectedNodeType &&
                    <TemplateName rootStyle={props?.rootStyle} />
                }
                {/* {!props?.selectedNodeType &&
                    <Typography fontSize={'16px'} fontWeight={500} sx={{ marginBottom: '16px' }}>
                        Content
                    </Typography>
                } */}


                <DynamicView sx={[{ backgroundColor: "white", mb: 3 }, props?.rootStyle]}>
                    {!props?.selectedNodeType &&
                        <Grid>
                            <Typography fontWeight={'bold'} sx={{ mb: 1 }}>
                                {'Content'}
                            </Typography>

                        </Grid>
                    }
                    <DynamicSubView>
                        {!props?.selectedNodeType &&
                            <Header rootStyle={props?.rootStyle} />
                        }


                        <Body rootStyle={props?.rootStyle} selectedNodeType={props?.selectedNodeType} />
                        {!props?.selectedNodeType &&
                            <Footer rootStyle={props?.rootStyle} />
                        }
                    </DynamicSubView>
                </DynamicView>

                <DynamicView sx={[{ backgroundColor: "white", mb: 3 }, props?.rootStyle]}>

                    <Buttons rootStyle={props?.rootStyle} selectedNodeType={props?.selectedNodeType} />
                </DynamicView>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    // alignItems: 'flex-end',
                    // padding: '0px',
                    // gap: '12px',
                    // width: '360px',
                    // height: '84px',
                }}>
                    <Button
                        color={Object.keys(props?.selectedTemplate ?? {}).length > 0 ? 'danger' : 'primary'}
                        loading={props?.isMediaUploading ||
                            props?.isSessionCreating ||
                            props?.isTemplateCreating || props?.isTemplateDeleting} variant='solid'
                        onClick={() => {
                            if (props?.selectedNodeType) {
                                props?.handleNodeDataUpdate();
                            }
                            else if (Object.keys(props?.selectedTemplate ?? {}).length > 0) {
                                props?.deleteTemplateHandler(props?.selectedTemplate);
                            }
                            else {
                                props?.handleCreateTemplate();
                            }
                        }}
                        sx={{
                            // width: '360px',
                            // height: '36px',
                        }}>
                        {Object.keys(props?.selectedTemplate ?? {}).length > 0 ? 'DELETE' : 'SAVE'}
                    </Button>
                    <Button variant='outlined' sx={{
                        // width: '360px',
                        // height: '36px',
                        ml: 4
                    }}
                        onClick={props?.onClose}
                    >
                        CANCEL
                    </Button>
                </Box>
            </Paper>
        </>
    );
}

export default EditMessage;
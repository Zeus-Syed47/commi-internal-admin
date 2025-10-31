import React, { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Conditions from './conditions';


function ConditionEdit(props) {
    return (
        <>
            <Paper variant="outlined" sx={[{
                //minHeight: '1273px', 
                width: '760px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#FFFFFF',
                boxShadow: '1px 0px 0px rgba(0, 0, 0, 0.08)',
                padding: '10px',
            }, props?.rootRootStyle]}>
                <Box sx={[{
                    width: '680px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                    padding: '2px'
                }, props?.rootStyle]}>
                    <Typography fontSize={'24px'} fontWeight={400} sx={{}}>
                        {'Set a condition'}
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

                <Conditions rootStyle={props?.rootStyle} />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '0px',
                    gap: '12px',
                    width: '360px',
                    height: '84px',
                }}>
                    <Button variant='contained'
                        onClick={() => {
                            if (props?.selectedNodeType) {
                                props?.handleNodeDataUpdate();
                            }
                            else {
                                props?.handleCreateTemplate();
                            }
                        }}
                        sx={{
                            width: '360px',
                            height: '36px',
                        }}>
                        SAVE
                    </Button>
                    <Button variant='outlined' sx={{
                        width: '360px',
                        height: '36px',
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

export default ConditionEdit;
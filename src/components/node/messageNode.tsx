import React, { useMemo } from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MessageIcon from '@mui/icons-material/Message';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import useStore from "@/store";
import { PictureAsPdf } from '@mui/icons-material';
import { useTheme } from '@mui/joy';
import useMediaQuery from '@mui/material/useMediaQuery';


function MessageNode(props) {

    const { header, body, footer, templateButtons } = props?.nodeValues


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    function headerPreview(header: { format: string, src: string }): JSX.Element {
        const titleStyle = {
            padding: '4px 12px',
            height: '28px',
            background: '#F5F5F5',
            borderRadius: '4px',
            marginBottom: '3px'
        } as const;
        return (
            <>
                {!props?.justDisplay &&
                    <Typography color='#41C352' fontSize={'12px'} fontWeight={400} sx={titleStyle}>Header</Typography>
                }
                {header?.format == 'TEXT' ?
                    <Typography sx={{
                        fontSize: isMobile ? '14px' : '16px'
                    }}>{header?.src}</Typography>
                    : header?.format == 'IMAGE' ?
                        <img src={header?.src} width={'220px'} />
                        : header?.format == 'VIDEO' ?
                            <Typography>{header?.src}</Typography>
                            : header?.format == 'DOCUMENT' ?
                                // <Typography>{header?.src}</Typography>
                                <a href={header?.src} target='_blank'>
                                    <PictureAsPdf sx={{
                                        height: isMobile ? 40 : 60,
                                        width: isMobile ? 40 : 60
                                    }} />
                                </a>
                                : null}
            </>
        );
    }

    function textPreview(title: string, text: string): JSX.Element {
        const titleStyle = {
            padding: '4px 12px',
            height: '28px',
            background: '#F5F5F5',
            borderRadius: '4px',
            marginBottom: '3px'
        } as const;
        return (
            <>
                {!props?.justDisplay &&
                    <Typography color='#41C352' fontSize={'12px'} fontWeight={400} sx={titleStyle}>{title}</Typography>
                }
                <Typography sx={{
                    fontSize: isMobile ? '14px' : '16px'
                }}>{text}</Typography>
            </>
        );
    }

    function dashedLine(): JSX.Element {
        const lineStyle = {
            width: '218px',
            height: '0px',
            border: '1px dashed #25D366',
            marginBottom: '8px',
            marginTop: '8px'
        } as const;
        return (
            <Box sx={lineStyle}></Box>
        );
    }

    function buttonPreview(button): JSX.Element {
        const buttonStyle = {
            width: isMobile ? '100px' : '232px',
            height: '30px',
            marginTop: '8px',
            backgroundColor: '#FFFFFF',
            padding: '5.34103px 0px'
        } as const;
        return (
            <Card variant='elevation' sx={buttonStyle}>
                <Typography align='center' color={'#007DFF'} fontSize={'14px'} fontWeight={400}>{button?.text}</Typography>
            </Card>
        );
    }

    return (
        <Paper variant="outlined" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '12px',
            width: isMobile ? '160px' : '304px',
            border: '2px solid #007DFF',
            background: '#FFFFFF',
            borderShadow: '0px 2px 6px rgba(0, 0, 0, 0.18)',
            borderRadius: '8px',
        }}>
            {!props?.justDisplay &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center",
                    gap: '8px',
                    marginBottom: '14px'
                }}>
                    <Avatar sx={{ bgcolor: '#7986CB', height: '32px', width: '32px', padding: '10px', gap: '10px' }}>
                        <MessageIcon sx={{ height: '16px', width: '16px' }} />
                    </Avatar>
                    <Typography fontSize={16} fontWeight={500} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        Message Example
                    </Typography>
                </Box>
            }
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: 'center',
                width: isMobile ? '130px' : '280px',
                backgroundColor: '#F5F5F5',
                borderRadius: '8px',
                padding: '20px'
            }}>
                <Card variant='elevation' sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: isMobile ? '100px' : '232px',
                    backgroundColor: '#FFFFFF',
                    padding: '7.12px'
                }}>
                    {header?.src !== '' ?
                        <>
                            {headerPreview(header)}
                            {dashedLine()}
                        </>
                        : null}
                    {body !== '' ? textPreview('Body message', body) : null}
                    {footer !== '' ?
                        <>
                            {dashedLine()}
                            {textPreview('Footer', footer)}
                        </>
                        : null}
                </Card>
                {templateButtons?.map(button => buttonPreview(button))}
            </Box>
        </Paper>
    );
}

export default MessageNode;
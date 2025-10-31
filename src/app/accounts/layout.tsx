'use client'
import { fbLogin, sessionInfoListener } from "@/utils/fbSdk";
import { Button, Grid2, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDropzone } from 'react-dropzone'

export default function UsersLayout({ children }) {



    useEffect(() => {
        window.addEventListener('message', sessionInfoListener);
    }, [])


    return (
        <Grid2 sx={{ p: 3 }}>
            <Grid2 sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2,
                mb: 2,
                fontWeight: 700,
                color: 'gray',
                // borderBottom: '1px solid lightgray'
            }}>
                <Typography variant='h6' sx={{ ml: 2, pb: 2 }}>Contacts</Typography>

                <Button variant="outlined" onClick={() => {
                    fbLogin().then((response) => {
                        console.log(response);
                        if (response.status === "connected") {
                            console.log("Person is connected");
                        } else {
                            // something
                        }
                    })
                }}>Connect to WABA</Button>
            </Grid2>
            {children}

        </Grid2>
    )

}

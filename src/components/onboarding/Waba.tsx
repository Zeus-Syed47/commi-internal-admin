'use client'
import { fbLogin, sessionInfoListener } from "@/utils/fbSdk";
import { Button, Grid2 } from "@mui/material";
import { useEffect } from "react";

export default function WABA() {

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

                <Button variant="outlined" onClick={() => {
                    fbLogin().then((response: any) => {
                        console.log('response 1', response);
                        if (response.status === "connected") {
                            console.log("Person is connected");
                        } else {
                            // something
                        }

                        if (response?.authResponse) {
                            const code = response?.authResponse?.code;
                            console.log('response 2: ', code); // remove after testing
                            // your code goes here
                        } else {
                            console.log('response: 2', response); // remove after testing
                            // your code goes here
                        }
                    })
                }}>Connect to WABA</Button>
            </Grid2>


        </Grid2>
    )

}

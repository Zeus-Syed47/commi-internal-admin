
import StocksSelector from '@/app/portfos/create/StocksSelector';
import { getLocaleString } from '@/utils/getLocale';
import { Close, Refresh } from '@mui/icons-material';
import { Drawer, Grid, Typography } from '@mui/material';
import * as React from 'react';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import CreateButton from '../button/createButton';


export default function StocksRebalancerDrawer(props) {

    const { openRebalancer, closeRebalancer, selected } = props;

    const handleUpdateRebancer = useCallback(() => {
        toast.success(getLocaleString('portfoUpdate'))

        // update store here 

        closeRebalancer()
    }, [closeRebalancer])


    const available = [
        { name: "Apple", ticker: "APL" },
        { name: "Tesla", ticker: "TSL" },
        { name: "Microsoft", ticker: "MIR" },
        { name: "Louis Vuitton", ticker: "LMBV" },
        { name: "Nike", ticker: "NIKE" },
        { name: "Lo'real", ticker: "LOR" },
        { name: "SONY", ticker: "SON" },
    ]


    return <Drawer open={openRebalancer}
        anchor={'right'}
        onClose={closeRebalancer}>
        <Grid sx={{ p: 5, }}>
            <Typography variant='h6' sx={{ mb: 5 }}>{`${getLocaleString('rebalance')} ${getLocaleString('portfo')}`}</Typography>
            <StocksSelector
                selected={selected}
                available={available}
                updateToSummary={(data) => console.log('updated', data)}
                searchStocksStyle={{
                    alignSelf: 'flex-end'
                }} />
            <Grid sx={{ display: 'flex', flex: 1, justifyContent: 'space-between', mt: 5 }}>
                <CreateButton
                    label={getLocaleString('close')}
                    color='error'
                    onClick={closeRebalancer}
                    startIcon={<Close />} />
                <CreateButton
                    label={getLocaleString('rebalance')}
                    color='success'
                    startIcon={<Refresh />}
                    onClick={() => handleUpdateRebancer()}
                />
            </Grid>
        </Grid>
    </Drawer>


}
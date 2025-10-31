'use client'


import { ControlledBoard, moveCard, OnDragEndNotification, Card } from '@caldwell619/react-kanban'
import { useState } from 'react'
import '@caldwell619/react-kanban/dist/styles.css'
import { Box, Grid, Typography } from '@mui/joy'
import usePipeline from '@/hooks/usePipeline'
import KanbanBoardLoader from '@/components/loader/KanbanLoader'

const MyBoard = () => {

    const { board, handleCardMove, isLoading } = usePipeline()


    return (
        <Box
            sx={{
                pt: { xs: 'var(--Header-height)', sm: 0 },
                // my: 4,
                p: 4,
                maxWidth: { xs: 360, sm: 1700 },
            }}
        >
            <Typography level='h4' color="primary" pt={4} pb={2}>
                Sales pipeline
            </Typography>
            {isLoading ?
                <KanbanBoardLoader />
                :
                <ControlledBoard

                    onCardDragEnd={handleCardMove} >{board}</ControlledBoard>
            }
        </Box>
    )
}
export default MyBoard
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Handle,
    Position,
    getConnectedEdges,
    useNodeId,
    useUpdateNodeInternals,
    useNodesData,
    useReactFlow
} from "@xyflow/react";
import { Box, Button, Grid, Grid2, IconButton, TextField, Typography } from "@mui/material";
import useStore from "@/store";
import LightTooltip from "@/components/tooltip/LightTooltip";
import { Edit } from "@mui/icons-material";

const Message = (props) => {

    const updateNodeId = useStore(state => state.updateNodeId)
    const updateSelectedNodeType = useStore(state => state.updateSelectedNodeType)
    const currentNodeId = useStore(state => state.nodeId)

    const { updateNodeData } = useReactFlow();
    const updateNodeInternals = useUpdateNodeInternals();

    const nodeId = useNodeId();

    const nodesData = useNodesData(nodeId);

    const [messageObjects, setMessageObjects] = useState([{ type: "" }]);


    // useEffect(() => {
    //     if (nodesData?.data?.buttons?.length) {
    //         updateNodeInternals(nodeId);
    //     }
    // }, [nodesData?.data?.buttons, nodeId, updateNodeInternals])

    useEffect(() => {
        if (nodesData?.data?.data?.length) {
            setMessageObjects(nodesData?.data?.data)
        }
    }, [nodesData?.data?.data])

    const updateMessageObject = useCallback((index, value, key) => {
        const tempMessageObjects = [...messageObjects]

        const messageObject = tempMessageObjects[index];

        messageObject[key] = value;

        tempMessageObjects[index] = messageObject;

        setMessageObjects(tempMessageObjects);

        updateNodeData(nodeId, {
            data: tempMessageObjects,
            type: 'node_text',
            subType: 'message'
        })


    }, [messageObjects, setMessageObjects, nodeId, updateNodeData]);

    const renderField = useCallback((index, row) => {
        switch (row?.type) {
            case 'text':
                return <TextField value={row?.value} onChange={(e) => {
                    updateMessageObject(index, e?.target?.value, 'value')
                }} type="small" />
        }
    }, [updateMessageObject])

    const messageObject = useCallback((condition, index) => {

        return (
            <Grid2 sx={{ mt: 2 }}>
                {condition?.type ?
                    renderField(index, condition)
                    :
                    <>
                        <Button variant='contained' onClick={() => {
                            updateMessageObject(index, 'text', 'type')
                        }}>{'Message'}</Button>
                        <Button onClick={() => {
                            updateMessageObject(index, 'image', 'type')
                        }}>{'Image'}</Button>
                        <Button onClick={() => {
                            updateMessageObject(index, 'document', 'type')
                        }}>{'Document'}</Button>
                    </>
                }
            </Grid2>
        )

    }, [renderField, updateMessageObject]);

    const messageRows = useMemo(() => {
        return messageObjects?.map((condition, index) => messageObject(condition, index))
    }, [messageObjects, messageObject]);

    const addButtonView = useMemo(() => {
        return <Grid2 sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', mt: 2 }}>
            <Button size='small' variant='contained' onClick={() => setMessageObjects([...messageObjects, { type: "" }])}>
                {'Add'}
            </Button>
        </Grid2>
    }, [messageObjects]);

    return (
        <LightTooltip title={
            <Box sx={{ backgroundColor: 'white' }}>
                <IconButton onClick={() => {
                    // updateNodeId(nodeId)
                    updateSelectedNodeType(props?.type)
                }}><Edit /></IconButton>
            </Box>
        } placement="left-start">
            <div
                className={`card p-1 ${currentNodeId === nodeId && "shadow-lg border border-info"
                    } bg-body-tertiary`}
                style={{ minWidth: "12rem" }}
            >
                <div className="card-header text-center bg-info-subtle text-info-emphasis fw-bold">
                    {'Message'}
                </div>
                <div className="card-body">{'This is sample message'}</div>

                {messageRows}
                {addButtonView}
                <Handle
                    type="target"
                    position={Position.Left}
                    id="ht-1"
                // isConnectable={singleSourceConnect}
                // draggable
                // onDragStart={(e) => {
                //     dragStart(e, "questionWithButton", "dummy text")
                //     console.log('e', e)
                // }}
                />

            </div>
        </LightTooltip>
    );
};

export default Message;

import React, { useEffect, useMemo } from "react";
import {
    Handle,
    Position,
    getConnectedEdges,
    useNodeId,
    useUpdateNodeInternals,
    useNodesData
} from "@xyflow/react";
import { Box, IconButton, Typography } from "@mui/material";
import LightTooltip from "@/components/tooltip/LightTooltip";
import useStore from "@/store";
import { Edit } from "@mui/icons-material";

const Condition = (props) => {


    const updateNodeId = useStore(state => state.updateNodeId)
    const updateSelectedNodeType = useStore(state => state.updateSelectedNodeType)
    const currentNodeId = useStore(state => state.nodeId)
    const updateNodeInternals = useUpdateNodeInternals();

    const nodeId = useNodeId();

    const nodesData = useNodesData(nodeId);

    // useEffect(() => {
    //     if (nodesData?.data?.buttons?.length) {
    //         updateNodeInternals(nodeId);
    //     }
    // }, [nodesData?.data?.buttons, nodeId, updateNodeInternals])

    return (
        <LightTooltip title={
            <Box sx={{ backgroundColor: 'white' }}>
                <IconButton onClick={() => {
                    updateNodeId(nodeId)
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
                    {'Condition'}
                </div>
                <div className="card-body">{'This is based on condition'}</div>
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
                {
                    ["True", "False"].map(
                        (button, index) => {
                            return <div style={{
                                marginBottom: 10, display: 'flex',
                                flex: 1, alignItems: 'center', justifyContent: 'flex-end'

                            }}>
                                <Typography sx={{ mr: 2 }}>{button}</Typography>
                                <Handle
                                    type="source"
                                    position={Position.Right}
                                    id={`handle-${index}`}
                                    isConnectable={true}
                                    style={{
                                        position: 'relative',
                                        width: 16,
                                        height: 16,
                                        transform: 'translate(0%, 0%)',
                                        backgroundColor: index === 0 ? 'green' : 'red'
                                    }}
                                />
                            </div>
                        })
                }
            </div>
        </LightTooltip>
    );
};

export default Condition;

'use client'
import React, { useContext, useEffect, useMemo } from "react";
import {
    Handle,
    Position,
    getConnectedEdges,
    useNodeId,
    useUpdateNodeInternals,
    useNodesData,
} from "@xyflow/react";
import { Box, IconButton, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from "@mui/material";
import { Edit } from "@mui/icons-material";
import useStore from "@/store";
import LightTooltip from "@/components/tooltip/LightTooltip";
import { TemplateContext } from "@/context/templateContext";

const QuestionWithButton = (props) => {
    const updateNodeId = useStore(state => state.updateNodeId)
    const updateSelectedNodeType = useStore(state => state.updateSelectedNodeType)

    const currentNodeId = useStore(state => state.nodeId)

    const { updateTemplateFields } = useContext(TemplateContext)

    const updateNodeInternals = useUpdateNodeInternals();

    const nodeId = useNodeId();

    const nodesData = useNodesData(nodeId);


    // const singleSourceConnect = useMemo(() => {
    //     const node = nodeInternals?.get(nodeId);
    //     const connectedEdges = getConnectedEdges([node], edges);

    //     return connectedEdges.length < 1;
    // }, [nodeInternals, edges, nodeId]);

    // useUpdateNodeInternals   *******  important for dynamic handle renders

    useEffect(() => {
        if (nodesData?.data?.buttons?.length) {
            updateNodeInternals(nodeId);
        }
    }, [nodesData?.data?.buttons, nodeId, updateNodeInternals])

    return (
        <LightTooltip title={
            <Box sx={{ backgroundColor: 'white' }}>
                <IconButton onClick={() => {
                    updateNodeId(nodeId)
                    updateSelectedNodeType(props?.type)
                    updateTemplateFields({
                        key: 'body',
                        value: nodesData?.data?.question
                    })
                    updateTemplateFields({
                        key: 'templateButtons',
                        value: nodesData?.data?.buttons
                    })
                }}><Edit /></IconButton>
            </Box>
        } placement="left-start">
            <div
                className={`card p-1 ${currentNodeId === nodeId && "shadow-lg border border-info"
                    } bg-body-tertiary`}
                style={{ minWidth: "12rem" }}
            >
                <div className="card-header text-center bg-info-subtle text-info-emphasis fw-bold">
                    {'Question'}
                </div>
                <div className="card-body">{nodesData?.data?.question ?? props?.data.content}</div>

                {
                    nodesData?.data?.buttons?.map(
                        (button, index) => {
                            return <div style={{
                                marginBottom: 10, display: 'flex',
                                flex: 1, alignItems: 'center', justifyContent: 'flex-end'

                            }}>
                                <Typography sx={{ mr: 2 }}>{button?.text}</Typography>
                                <Handle
                                    type="source"
                                    position={Position.Right}
                                    id={`${index + 1}`}
                                    isConnectable={true}
                                    style={{
                                        position: 'relative',
                                        width: 16,
                                        height: 16,
                                        transform: 'translate(0%, 0%)',

                                    }}
                                />
                            </div>
                        })
                }
            </div>
        </LightTooltip>
    );
};

export default QuestionWithButton;

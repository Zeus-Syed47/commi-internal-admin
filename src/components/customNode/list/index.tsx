import React, { useEffect, useMemo } from "react";
import {
    Handle,
    Position,
    getConnectedEdges,
    useNodeId,
    useStore,
    useUpdateNodeInternals,
    useNodesData
} from "@xyflow/react";

const ListNode = ({ data, selected }) => {
    const { nodeInternals, edges } = useStore((st) => ({
        nodeInternals: st.nodeInternals,
        edges: st.edges,
    }));

    const updateNodeInternals = useUpdateNodeInternals();

    const nodeId = useNodeId();

    const nodesData = useNodesData(nodeId);

    console.log('list nodesData', nodesData, nodeId);

    const dragStart = (e, nodeType, contentText) => {
        e.dataTransfer.setData("dataType", nodeType);
        e.dataTransfer.setData("label", contentText);
        e.dataTransfer.effectAllowed = "move";
    };

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
        <div
            className={`card p-1 ${selected && "shadow-lg border border-info"
                } bg-body-tertiary`}
            style={{ minWidth: "12rem" }}
        >
            <div className="card-header text-center bg-info-subtle text-info-emphasis fw-bold">
                {'List'}
            </div>
            <div className="card-body">{data.content}</div>
            <Handle
                type="target"
                position={Position.Left}
                id="h-2"
            // isConnectable={singleSourceConnect}
            // draggable
            // onDragStart={(e) => {
            //     dragStart(e, "questionWithButton", "dummy text")
            //     console.log('e', e)
            // }}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="h-3"
                style={{ top: 90 }}
            // isConnectable={singleSourceConnect}
            />
            {/* <Handle type="target" position={Position.Top} id="h-1" /> */}
        </div>
    );
};

export default ListNode;

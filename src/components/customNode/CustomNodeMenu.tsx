import React, { useMemo } from "react";
import {
    useNodeId,
    useStore,
} from "@xyflow/react";

const CustomNodeMenu = ({ data, selected, handleNodeAdd }) => {
    const { nodeInternals, edges } = useStore((st) => ({
        nodeInternals: st.nodeInternals,
        edges: st.edges,
    }));

    const nodeId = useNodeId();

    const menuList = [
        // { key: "List", value: "listNode", targetHandle: 'h-2', sourceHandle: 'h-3' },
        { key: "Send a message", value: 'message' },
        // { key: "Set a condition", value: 'condition' },
        { key: "Ask a question", value: 'questionWithButtonAndTarget' },
        // { key: "Button", value: '', sourceHandle: 'h-2' },
        // { key: "Subscribe", value: '', sourceHandle: 'h-2' }
    ]


    return (
        <div
            id="customNodeMenu"
            className={`card p-1 ${selected && "shadow-lg border border-info"
                } bg-body-tertiary`}
            style={{ minWidth: "12rem", display: 'none', height: '18rem', overflowY: 'auto' }}
        >
            {menuList?.map(menu =>
                <div className="card-body cursor-pointer" onClick={(e) => { handleNodeAdd(menu, e, true) }}>{menu?.key}</div>
            )}
        </div>
    );
};

export default CustomNodeMenu;

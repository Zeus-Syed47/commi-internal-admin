import { Grid2 } from "@mui/material";
import React from "react";
import EditMessage from "../edit/editMessage";
import ConditionEdit from "../conditionEdit";


const Component = ({ selectedNodeType, handleNodeDataUpdate, onClose }) => {
    return (

        <Grid2 container
            spacing={10} direction={'row'} wrap={'wrap'} sx={{
                width: '36rem',
                bottom: "5rem",
                right: "2rem", top: "5rem",
            }}>

            {selectedNodeType === 'condition' ?
                <ConditionEdit
                    rootStyle={{
                        width: '30rem'
                    }}
                    rootRootStyle={{
                        width: '36rem',
                        bottom: "5rem",
                        right: "2rem", top: "5rem",
                    }}
                    selectedNodeType={selectedNodeType} />
                :
                <EditMessage
                    rootStyle={{
                        width: '32rem',
                        p: 0,
                    }}
                    rootRootStyle={{
                        width: '36rem',
                        right: "2rem", top: "5rem",
                    }}
                    selectedNodeType={selectedNodeType}
                    onClose={onClose}
                    handleNodeDataUpdate={handleNodeDataUpdate}

                />
            }

        </Grid2>

    );
};

const NodeEdit = ({ isSelected, addNodes, selectedNodeType, handleNodeDataUpdate, onClose }) => {
    return (

        <div
            className="position-absolute border rounded overflow-y-scroll d-none d-lg-block"
            style={{ right: "2rem", top: "5rem", bottom: "5rem", width: "36rem" }}
        >
            <Component
                isSelected={isSelected}
                addNodes={addNodes}
                selectedNodeType={selectedNodeType}
                handleNodeDataUpdate={handleNodeDataUpdate}
                onClose={onClose}
            />
        </div>


    );
};

export default NodeEdit;

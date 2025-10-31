'use client'

import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  MiniMap,
  useReactFlow
} from "@xyflow/react";
import "./create-flow.css";

import "@xyflow/react/dist/style.css";
import { initialEdges, initialNodes } from "../../content/initial-elements";
import Sidebar from "@/components/Sidebar";
import CustomNode from "@/components/customNode";
import QuestionWithButton from "@/components/customNode/ask-question/QuestionWithButton";
import NodeEdit from "@/components/NodeEdit";
import CustomNodeMenu from "@/components/customNode/CustomNodeMenu";
import ListNode from "@/components/customNode/list";
import useStore from "@/store";
import QuestionWithButtonAndTarget from "@/components/customNode/ask-question/QuestionWithButtonAndTarget";
import Condition from "@/components/customNode/condition/Condition";
import Message from "@/components/customNode/message/Message";
import { Button, Grid, Grid2, IconButton, TextField } from "@mui/material";
import { ChevronLeft, ChevronLeftTwoTone } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import useFlow from "@/hooks/useFlows";
import { TemplateContext } from "@/context/templateContext";
import MessageWithSource from "@/components/customNode/message/MessageWithSource";


const nodeTypes = {
  customNode: CustomNode,
  questionWithButton: QuestionWithButton,
  questionWithButtonAndTarget: QuestionWithButtonAndTarget,
  listNode: ListNode,
  condition: Condition,
  message: Message,
  messageWithSource: MessageWithSource
};



export default function CreateFlow() {
  const router = useRouter()
  const rfWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [flowName, setFlowName] = useState('');

  const [id, setId] = useState(1);

  const [rfInstance, setRfInstance] = useState(null);

  const [currentNodeSourceId, setCurrentNodeSourceId] = useState()

  const [currentNodeSourceHandleId, setCurrentNodeSourceHandleId] = useState()

  const { handleCreateFlow, handleUpdateFlow, isFlowCreating, isFlowUpdating } = useFlow();


  const { updateNodeData } = useReactFlow();

  const nodeId = useStore(state => state.nodeId)
  const selectedNodeType = useStore(state => state.selectedNodeType)
  const updateNodeId = useStore(state => state.updateNodeId)
  const updateSelectedNodeType = useStore(state => state.updateSelectedNodeType)
  const selectedFlow = useStore(state => state.selectedFlow)
  const updateSelectedFlow = useStore(state => state.updateSelectedFlow)


  // useContext
  const { nodeValues, resetTemplateFields, updateTemplateFields } = useContext(TemplateContext)

  const body = useMemo(() => nodeValues.body, [nodeValues.body]);
  const templateButtons = useMemo(() => nodeValues.templateButtons, [nodeValues.templateButtons]);


  useEffect(() => {
    if (selectedFlow && Object.keys(selectedFlow).length > 0) {
      setNodes(selectedFlow?.nodes);
      setEdges(selectedFlow?.edges);
      setFlowName(selectedFlow?.name);
    }
  }, [selectedFlow])

  useEffect(() => {
    const isSelected = nodes.some((each) => each.selected);
    // setIsSelected(isSelected);
    if (!isSelected) {
      //  onClose();
    }
  }, [nodes]);

  const onNodeClick = (e, node) => {
    updateSelectedNodeType(node?.type)
    if (node?.type !== 'message') {
      updateNodeId(node.id);
    }
    updateTemplateFields({
      key: 'body',
      value: node?.data?.question
    })
    updateTemplateFields({
      key: 'templateButtons',
      value: node?.data?.buttons
    })
  };

  const generateId = useCallback(() => {
    let tempId = id;
    setId(id => id + 1)
    return `node_${id}`
  }, [id]);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData("dataType");
      const label = e.dataTransfer.getData("label");
      const nodeId = e.dataTransfer.getData("nodeId");
      const sourceHandleId = e.dataTransfer.getData("sourceHandleId");

      updateNodeId(nodeId);
      setCurrentNodeSourceHandleId(sourceHandleId)

      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = rfInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      // setNodes((node) =>
      //   node.concat({
      //     id: generateId(),
      //     type: type,
      //     position: position,
      //     data: {
      //       heading: "Send Message",
      //       content: label,
      //     },
      //   })
      // );

      // position a menu at specific position

      var d = document.getElementById('customNodeMenu')
      d.style.display = "block";
      d.style.position = "absolute";
      d.style.left = e.clientX + 'px';
      d.style.top = e.clientY + 'px';

    },
    [setNodes, rfInstance]
  );

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges]
  );


  const addNodes = useCallback((menu, e, connect) => {
    const position = rfInstance.screenToFlowPosition({
      x: e.clientX + 150,
      y: e.clientY + 10,
    });
    const newNodeId = generateId()
    setNodes((nodes) =>
      nodes.concat({
        id: newNodeId,
        type: menu?.value,
        position: position,
        data: {
          heading: "Send Message",
          content: "Type your message here",
        },
      })
    );
    var d = document.getElementById('customNodeMenu')
    d.style.display = "none";


    // if thr is existing node, connect
    if (connect) {
      setEdges((eds) => addEdge({
        source: currentNodeSourceId,
        sourceHandle: currentNodeSourceHandleId,
        target: newNodeId,
        targetHandle: menu?.targetHandle
      }, eds))
    }

  }, [setNodes, rfInstance, currentNodeSourceId, currentNodeSourceHandleId, setEdges, generateId])

  const resetNodes = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges])


  const onClose = useCallback(() => {
    updateNodeId();
    updateSelectedNodeType();
    resetTemplateFields()
  }, [updateNodeId, updateSelectedNodeType, resetTemplateFields]);


  const handleNodeDataUpdate = useCallback(() => {

    updateNodeData(nodeId, {
      question: body,
      buttons: templateButtons,
      type: 'interactive',
      subType: templateButtons?.length > 4 ? 'list' : 'button'
    });

    onClose()
  }, [nodeId, templateButtons, body, updateNodeData, onClose]);

  const onConnectEnd = useCallback(
    (event, connectionState) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position

        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;


        setCurrentNodeSourceId(connectionState.fromNode.id);
        setCurrentNodeSourceHandleId(connectionState.fromHandle.id)


        var d = document.getElementById('customNodeMenu')
        d.style.display = "inline";
        d.style.position = "absolute";
        d.style.left = clientX - 500 + 'px';
        d.style.top = clientY - 10 + 'px';
      }
    },
    [setCurrentNodeSourceId, setCurrentNodeSourceHandleId],
  );

  // console.log('nodes', nodes, edges)
  return (
    <Grid2 sx={{ display: 'flex', flex: 1, flexDirection: 'row', p: 1, flexGrow: 1 }}>
      <Sidebar
        isSelected={nodeId}
        addNodes={addNodes}
        nodes={nodes}
        resetNodes={resetNodes}
      />
      <Grid2 sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Grid2 sx={{ display: 'flex', flex: 1, justifyContent: 'space-between', width: '100%', alignItems: 'center', }}>
          <Grid2 sx={{ mb: 1, width: 260, flexDirection: 'row', display: 'flex' }}>
            <IconButton onClick={() => {
              updateSelectedFlow({})
              router.push('/automations/flows')
            }}><ChevronLeftTwoTone /></IconButton>
            <TextField
              sx={{
                width: '100%'
              }}
              value={flowName}
              placeholder="Please update flow name" size="small" onChange={(e) => {
                setFlowName(e?.target?.value)
              }} />
          </Grid2>
          <Grid2>
            <LoadingButton
              loading={selectedFlow && Object.keys(selectedFlow).length > 0 ? isFlowUpdating : isFlowCreating}
              size="small"
              onClick={() => {
                if (selectedFlow && Object.keys(selectedFlow).length > 0) {
                  handleUpdateFlow({
                    nodes, edges, flowName
                  })
                }
                else {
                  handleCreateFlow({
                    nodes, edges, flowName
                  })
                }
              }}>Save</LoadingButton>
            <Button size="small" >Cancel</Button>
          </Grid2>
        </Grid2>
        <div className="App">

          <ReactFlow
            ref={rfWrapper}
            nodes={nodes}
            edges={edges}
            // elementsSelectable={false}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeDoubleClick={onNodeClick}
            onPaneClick={onClose}
            // onDragOver={onDragOver}
            // onDrop={onDrop}
            onInit={setRfInstance}
            onConnectEnd={onConnectEnd}
          >
            <Controls position="bottom-left" />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
          {/* <Sidebar
          isSelected={nodeId}
          addNodes={addNodes}
        /> */}
          {nodeId &&
            <NodeEdit
              isSelected={nodeId}
              addNodes={addNodes}
              selectedNodeType={selectedNodeType}
              onClose={onClose}
              handleNodeDataUpdate={handleNodeDataUpdate}
            />
          }
          {!nodeId &&
            <MiniMap color='#e2e2e2' />
          }

          <CustomNodeMenu handleNodeAdd={addNodes} />
          <Grid2 sx={{ backgroundColor: 'white', height: 20, width: 60, position: 'absolute', right: 0, bottom: 2 }}></Grid2>
        </div>
      </Grid2>
    </Grid2 >
  );
}
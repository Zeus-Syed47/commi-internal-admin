import React from "react";
import EditMessage from "./EditMsg";
import NodeSelection from "./NodeSelection";


const Component = ({ addNodes, nodes, resetNodes }) => {

  return (
    <div className="bg-body-secondary p-1 h-100">
      {nodes?.length ?
        <header className="bg-primary-subtle p-2 rounded text-primary-emphasis mb-4 cursor-pointer" onClick={(e) => {
          resetNodes();
        }}>
          <h4 className="text-center">{'Reset'}</h4>
        </header>
        :
        <>
          <header className="bg-primary-subtle p-2 rounded text-primary-emphasis mb-4 cursor-pointer" onClick={(e) => {
            addNodes(
              { key: "Message", value: "messageWithSource", targetHandle: 'h-2', sourceHandle: 'h-2' },
              e, false)
          }}>
            <h4 className="text-center">{'Send a message'}</h4>
          </header>
          <header className="bg-primary-subtle p-2 rounded text-primary-emphasis mb-4 cursor-pointer" onClick={(e) => {
            addNodes(
              { key: "Question", value: "questionWithButton", targetHandle: 'h-2', sourceHandle: 'h-2' },
              e, false)
          }}>
            <h4 className="text-center">{'Ask a question'}</h4>
          </header>
          {/* <header className="bg-primary-subtle p-2 rounded text-primary-emphasis mb-4 cursor-pointer">
        <h4 className="text-center">{'Set a condition'}</h4>
      </header> */}
        </>
      }
    </div>
  );
};

const Sidebar = ({
  isSelected, text, textId,
  setText, setId, addNodes,
  nodes, resetNodes }) => {
  return (
    <div>
      <div
        // className="position-absolute border rounded overflow-hidden d-none d-lg-block"
        // className="position-relative"
        // style={{ left: "2rem", top: "5rem", bottom: "5rem", width: "20rem" }}
        style={{ width: "18rem", height: '100%' }}

      >
        <Component
          isSelected={isSelected}
          text={text}
          textId={textId}
          setText={setText}
          setId={setId}
          addNodes={addNodes}
          nodes={nodes}
          resetNodes={resetNodes}
        />
      </div>
      {/* <button
        type="button"
        className="btn btn-primary position-absolute start-50 d-lg-none"
        style={{ bottom: "2rem", transform: "translateX(-50%)" }}
        data-bs-toggle="offcanvas"
        data-bs-target="#barBottom"
        aria-controls="barBottom"
      >
        Add node
      </button> */}
      {/* <div
        className={`offcanvas offcanvas-bottom d-lg-none h-50 ${isSelected && "show"
          }`}
        tabIndex="-1"
        id="barBottom"
        aria-labelledby="barBottomLabel"
      >
        <Component
          isSelected={isSelected}
          text={text}
          textId={textId}
          setText={setText}
          setId={setId}
        />
      </div> */}
    </div>
  );
};

export default Sidebar;

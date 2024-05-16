/**
 * @file FILEPATH: /C:/Users/MATEBOOK/Desktop/theory/src/components/DrawGraph/DrawGraph.jsx
 * @summary This file contains the implementation of the DrawGraph component.
 * The DrawGraph component allows users to draw and manipulate graphs.
 * It provides functionality for adding nodes and edges, editing node and edge properties,
 * deleting nodes and edges, and displaying instructions.
 * The component uses React hooks and state management to handle user interactions and graph data.
 * It also includes sub-components for rendering nodes, edges, and various buttons.
 * The component is exported as the default export.
 *
 * @description The DrawGraph component is responsible for rendering and managing the graph drawing interface.
 * It receives props such as `close`, `sendGraph`, and `currentGraph` from its parent component.
 * The component initializes the graph data using the `useReducer` hook and sets up various state variables.
 * It also includes event handlers and helper functions for manipulating the graph data.
 * The component renders a UI with instructions, a graph drawing area, and various buttons for interacting with the graph.
 * It also includes error handling for duplicate edges and provides a snackbar alert for displaying error messages.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.close - A function to close the DrawGraph component.
 * @param {Function} props.sendGraph - A function to send the graph data to the parent component.
 * @param {Object} props.currentGraph - The current graph data to be displayed in the DrawGraph component.
 *
 * @returns {JSX.Element} The rendered DrawGraph component.
 */

/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { useState, useReducer, useRef, useEffect } from "react";
import NodeDrawn from "./NodeDrawn";
import EdgeDrawn from "./EdgeDrawn";
import EditWeight from "./EditWeight";
import Instructions from "./Instructions";
import ExportImport from "./ExportImport";
import BackButton from "./Buttons/BackButton";
import FinishButton from "./Buttons/FinishButton";
import WeightedEdgesToggle from "./Buttons/WeightedEdgesToggle";
import DirectedEdgesToggle from "./Buttons/DirectedEdgesToggle";
import NewButton from "./Buttons/NewButton";
import TemporalEdge from "./TemporalEdge";
import SnackbarAlert from "../Common/SnackbarAlert";
import CloseIcon from "@mui/icons-material/Close";

function dataReducer(state, event) {
  switch (event.name) {
    case "add-node":
      return {
        ...state,
        nodes: { ...state.nodes, [state.topNode]: event.value.node },
        topNode: state.topNode + 1,
      };
    case "add-edge":
      return {
        ...state,
        edges: { ...state.edges, [state.topEdge]: event.value.edge },
        topEdge: state.topEdge + 1,
      };
    case "edit-node":
      return {
        ...state,
        nodes: { ...state.nodes, [event.value.id]: event.value.node },
      };
    case "edit-edge":
      return {
        ...state,
        edges: {
          ...state.edges,
          [event.value.id]: {
            ...state.edges[event.value.id],
            w: event.value.weight,
          },
        },
      };
    case "delete-node":
      const { nodes, ...withoutNodes } = state;
      const { [event.value]: removedNode, ...updatedNodes } = nodes;
      return { nodes: updatedNodes, ...withoutNodes };
    case "delete-edge":
      const { edges, ...withoutEdges } = state;
      const { [event.value]: removedEdge, ...updatedEdges } = edges;
      return { edges: updatedEdges, ...withoutEdges };
    case "set-graph":
      return event.value;
    case "set-isWeighted":
      return { ...state, isWeighted: event.value };
    case "set-isDirected":
      return { ...state, isDirected: event.value };
    default:
      throw new Error();
  }
}
export default function DrawGraph({ close, sendGraph, currentGraph }) {
  const blankGraph = {
    topNode: 0,
    topEdge: 0,
    isWeighted: false,
    isDirected: false,
    nodes: {},
    edges: {},
  };
  const [graphData, updateGraphData] = useReducer(dataReducer, blankGraph);
  const [currentNode, setCurrentNode] = useState(null);
  const [currentEdge, setCurrentEdge] = useState(null);
  //Error states
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Vector to draw temporary line
  const [edgeVector, setEdgeVector] = useState({ x: 0, y: 0 });

  //Update initially the graph
  useEffect(() => {
    setGraph(currentGraph);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //State to open and close editWeight
  const [showEditWeight, setShowEditWeight] = useState(false);
  useEffect(() => {
    if (currentEdge === null) setShowEditWeight(false);
  }, [currentEdge]);

  function createNode(posX, posY) {
    updateGraphData({
      name: "add-node",
      value: { node: { x: posX, y: posY } },
    });
  }

  function createEdge(first, second) {
    if (first === second) return;
    //If user tries to add edge to u->v and it already exists
    if (findEdge(first, second)) {
      setErrorMessage("Edge already exists!");
      setOpenError(true);
      return;
    }
    //If user tries to add edge u->v but v->u already exists and is not directed
    if (!graphData.isDirected && findEdge(second, first)) {
      setErrorMessage("Graph needs to be directed to add double edges!");
      setOpenError(true);
      return;
    }
    updateGraphData({
      name: "add-edge",
      value: { edge: { u: first, v: second, w: 1 } },
    });
    if (graphData.isWeighted) handleClickEdge(graphData.topEdge, "double");
  }

  function deleteNode(id) {
    Object.entries(graphData.edges).forEach((element) => {
      const key = element[0];
      const edge = element[1];
      if (edge.u === id || edge.v === id) deleteEdge(key);
    });
    updateGraphData({
      name: "delete-node",
      value: id,
    });
  }

  function deleteEdge(id) {
    updateGraphData({
      name: "delete-edge",
      value: id,
    });
  }

  function handleClickEdge(id, clicks) {
    setCurrentEdge(id);
    setCurrentNode(null);
    if (clicks === "double") {
      setShowEditWeight(true);
    }
  }

  // Drag and drop functionality
  const dragTimeoutId = useRef("");
  const [isDragging, setIsDragging] = useState(false);

  function handleMouseUpNode() {
    if (isDragging) {
      DropNode();
    } else {
      clearTimeout(dragTimeoutId.current);
    }
  }

  function handleClickNode(id) {
    if (currentNode == null) {
      clear();
      setCurrentNode(id);
      dragTimeoutId.current = setTimeout(() => {
        setIsDragging(true);
      }, 100);
    } else {
      createEdge(currentNode, id);
      setCurrentNode(null);
    }
  }

  function DragNode(posX, posY) {
    updateGraphData({
      name: "edit-node",
      value: { id: currentNode, node: { x: posX, y: posY } },
    });
  }

  function DropNode() {
    setCurrentNode(null);
    setIsDragging(false);
  }

  function editWeight(id, weight) {
    updateGraphData({
      name: "edit-edge",
      value: { id, weight },
    });
  }

  function clear() {
    setCurrentNode(null);
    setCurrentEdge(null);
  }

  function setGraph(graph) {
    updateGraphData({
      name: "set-graph",
      value: graph,
    });
  }

  function hasDoubleEdge() {
    let ret = false;
    Object.values(graphData.edges).forEach(({ u, v }) => {
      if (findEdge(u, v) && findEdge(v, u)) ret = true;
    });
    return ret;
  }

  function findEdge(u, v) {
    return Object.values(graphData.edges).find(
      (edge) => edge.u === u && edge.v === v
    );
  }

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-[#00000080] overflow-auto z-10">
      <div className="w-[95%] flex flex-col justify-between bg-primary3 rounded-xl p-5 pt-0 mx-auto my-10 font-bold">
        <div className="flex justify-between items-center text-white px-5 py-5">
          <h2 className="font-bold text-[24px]">Dessiner un graphe</h2>
          <button className="border border-white p-1  h-fit rounded-full hover:scale-105 transition-all duration-300">
            <CloseIcon className="text-white" onClick={close} />
          </button>
        </div>

        <div className="h-full gap-4 grid grid-cols-12">
          <div className="col-span-2">
            <Instructions />
          </div>

          <div className="col-span-8">
            <svg
              className=" outline-none bg-playGroundBg rounded-xl shadow-md w-full h-full"
              onMouseDown={(event) => {
                if (currentNode == null && currentEdge == null)
                  createNode(
                    event.nativeEvent.offsetX,
                    event.nativeEvent.offsetY
                  );
                else clear();
              }}
              onMouseMove={(event) => {
                if (isDragging) {
                  DragNode(
                    event.nativeEvent.offsetX,
                    event.nativeEvent.offsetY
                  );
                } else {
                  setEdgeVector({
                    x: event.nativeEvent.offsetX,
                    y: event.nativeEvent.offsetY,
                  });
                }
              }}
              onMouseUp={handleMouseUpNode}
              onKeyDown={(event) => {
                if (event.code === "Escape") {
                  setCurrentNode(null);
                  setCurrentEdge(null);
                }
                if (event.code === "Delete") {
                  if (currentEdge != null) {
                    deleteEdge(currentEdge);
                  }
                  if (currentNode != null) deleteNode(currentNode);
                  setCurrentNode(null);
                  setCurrentEdge(null);
                }
              }}
              tabIndex="0"
            >
              {currentNode != null && isDragging === false && (
                <TemporalEdge
                  x1={graphData.nodes[currentNode].x}
                  y1={graphData.nodes[currentNode].y}
                  x2={edgeVector.x}
                  y2={edgeVector.y}
                />
              )}
              {Object.entries(graphData.edges).map((element) => {
                const idx = element[0];
                const edge = element[1];
                return (
                  <EdgeDrawn
                    key={idx}
                    id={idx}
                    edge={edge}
                    currentEdge={currentEdge}
                    position={{
                      x1: graphData.nodes[edge.u].x,
                      y1: graphData.nodes[edge.u].y,
                      x2: graphData.nodes[edge.v].x,
                      y2: graphData.nodes[edge.v].y,
                    }}
                    setCurrentEdge={setCurrentEdge}
                    handleClick={handleClickEdge}
                    isWeighted={graphData.isWeighted}
                    isDirected={graphData.isDirected}
                    isCurved={findEdge(edge.v, edge.u) !== undefined}
                  />
                );
              })}
              {Object.entries(graphData.nodes).map((element) => {
                const idx = element[0];
                const node = element[1];
                return (
                  <NodeDrawn
                    key={idx}
                    id={idx}
                    position={node}
                    handleClick={handleClickNode}
                    currentNode={currentNode}
                    isDragged={isDragging && idx === currentNode}
                  />
                );
              })}
            </svg>
            <SnackbarAlert
              openError={openError}
              setOpenError={setOpenError}
              error={errorMessage}
            />
            {showEditWeight && graphData.isWeighted && (
              <EditWeight
                currentEdge={currentEdge}
                setCurrentEdge={setCurrentEdge}
                handleSubmit={editWeight}
              />
            )}
          </div>

          <div className="col-span-2">
            <ExportImport graphData={graphData} setGraph={setGraph} />
          </div>
        </div>

        <div className="items-center mt-6 flex justify-between w-full">
          <BackButton close={close} />
          <WeightedEdgesToggle
            isWeighted={graphData.isWeighted}
            setIsWeighted={(checked) =>
              updateGraphData({ name: "set-isWeighted", value: checked })
            }
          />
          <FinishButton
            finish={() => {
              sendGraph(graphData);
              close();
            }}
          />
          <DirectedEdgesToggle
            isDirected={graphData.isDirected}
            setIsDirected={(checked) => {
              //If it has double edge throw error when trying to change to undirected
              if (hasDoubleEdge() && checked === false) {
                setErrorMessage(
                  "There is a double edge, graph can't be undirected until double edges are removed"
                );
                setOpenError(true);
                return;
              }
              updateGraphData({ name: "set-isDirected", value: checked });
            }}
          />
          <NewButton resetGraph={() => setGraph(blankGraph)} />
        </div>
      </div>
    </div>
  );
}

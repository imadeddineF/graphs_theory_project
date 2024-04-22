import { useState, useReducer, useRef, useEffect, useCallback } from "react";
import DrawGraph from "./DrawGraph/DrawGraph";
import SelectGraph from "./SelectGraph/SelectGraph";
import Node from "./Canvas/Node";
import Edge from "./Canvas/Edge";
import Menu from "./Menu/Menu";
import Footer from "./Footer";
import Reproductor from "./Reproductor/Reproductor";
import AlgorithmsController from "./Algorithms/AlgorithmsController";
import LogData from "./LogData/LogData";
import Header from "./Header";
import SnackbarAlert from "./Common/SnackbarAlert";
import dottedBg from "/assets/svgs/medium-light.svg";

// Function to save data to local storage
const saveDataToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Function to load data from local storage
const loadDataFromLocalStorage = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

function vizDataReducer(state, event) {
  switch (event.name) {
    case "node":
      return {
        ...state,
        nodes: { ...state.nodes, [event.value.id]: event.value.highlightId },
      };
    case "edge":
      return {
        ...state,
        edges: { ...state.edges, [event.value.id]: event.value.highlightId },
      };
    case "reset":
      return event.value;
    default:
      throw new Error();
  }
}

export default function Main() {
  const [showDrawGraph, setShowDrawGraph] = useState(false);
  const [showSelectGraph, setShowSelectGraph] = useState(false);
  // const blankGraph = useRef({
  //   topNode: 0,
  //   topEdge: 0,
  //   isWeighted: false,
  //   isDirected: false,
  //   nodes: {},
  //   edges: {},
  // });

  // const [graphData, setGraphData] = useState(blankGraph.current);
  const [graphData, setGraphData] = useState(() =>
    loadDataFromLocalStorage("graphData", {
      topNode: 0,
      topEdge: 0,
      isWeighted: false,
      isDirected: false,
      nodes: {},
      edges: {},
    })
  );
  const [currentAlgorithm, setCurrentAlgorithm] = useState();

  // Save graph data to local storage whenever it changes
  useEffect(() => {
    saveDataToLocalStorage("graphData", graphData);
  }, [graphData]);

  // Visualization states
  const blankVizData = useRef({ nodes: {}, edges: {} });
  const [vizData, updateVizData] = useReducer(
    vizDataReducer,
    blankVizData.current
  );
  const [speed, setSpeed] = useState(600);
  const [isPlaying, setIsPlaying] = useState(false);

  function vizNode(id, highlightId) {
    updateVizData({
      name: "node",
      value: { id: id, highlightId: highlightId },
    });
  }

  function vizEdge(u, v, highlightId, isDirected) {
    vizEdgeDirected(u, v, highlightId);
    if (!isDirected) vizEdgeDirected(v, u, highlightId);
  }

  function vizEdgeDirected(u, v, highlightId) {
    const edge = findEdgeId(u, v);
    if (edge !== undefined) {
      updateVizData({
        name: "edge",
        value: { id: edge, highlightId: highlightId },
      });
    }
  }

  function findEdgeId(u, v) {
    return Object.keys(graphData.edges).find(
      (id) =>
        Number(graphData.edges[id].u) === Number(u) &&
        Number(graphData.edges[id].v) === Number(v)
    );
  }

  // Canvas positioning
  const canvasRef = useRef();
  const [addPos, setAddPos] = useState({ x: 0, y: 0 });
  const canvasWidth = canvasRef.current
    ? canvasRef.current.getBoundingClientRect().width
    : 900;
  const canvasHeight = canvasRef.current
    ? canvasRef.current.getBoundingClientRect().height
    : 500;
  useEffect(() => {
    setAddPos({ x: (canvasWidth - 900) / 2, y: (canvasHeight - 500) / 2 });
  }, [canvasWidth, canvasHeight]);

  // Logdata states
  const [logdata, setLogData] = useState([]);
  function printLog(line) {
    setLogData((prevState) => prevState.concat(line));
  }

  // Tags for nodes
  const [tagData, setTagData] = useState({});
  function setTag(node, tag) {
    setTagData((prev) => {
      return { ...prev, [node]: tag };
    });
  }

  // Reset visualization
  const resetViz = useCallback(() => {
    setLogData([]);
    setTagData({});
    updateVizData({
      name: "reset",
      value: blankVizData.current,
    });
  }, []);

  useEffect(() => {
    if (isPlaying) {
      resetViz();
    }
  }, [isPlaying, resetViz]);

  // Snackbar alert errors
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState();

  return (
    <>
      <div className="">
        <Header
          setShowDrawGraph={setShowDrawGraph}
          setShowSelectGraph={setShowSelectGraph}
          setOpenError={setOpenError}
          setError={setError}
          isPlaying={isPlaying}
        />

        <main className="grid grid-cols-10">
          <div className="col-span-2">
            <Menu setCurrentAlgorithm={setCurrentAlgorithm} />
          </div>

          <div className="flex flex-col col-span-8">
            {/* Drawing area */}
            <div
              className="relative bg-[#F3F3F3] overflow-hidden h-[680px] w-full flex justify-center items-center"
              ref={canvasRef}
            >
              <img
                className="absolute top-0 left-0 scale-150 w-full h-full"
                src={dottedBg}
                alt=""
              />
              <svg className="w-full z-10 h-full">
                {Object.entries(graphData.edges).map((element) => {
                  const idx = element[0];
                  const edge = element[1];
                  return (
                    <Edge
                      key={idx}
                      id={idx}
                      edge={edge}
                      position={{
                        x1: graphData.nodes[edge.u].x + addPos.x,
                        y1: graphData.nodes[edge.u].y + addPos.y,
                        x2: graphData.nodes[edge.v].x + addPos.x,
                        y2: graphData.nodes[edge.v].y + addPos.y,
                      }}
                      isWeighted={graphData.isWeighted}
                      isDirected={graphData.isDirected}
                      isCurved={findEdgeId(edge.v, edge.u) !== undefined}
                      highlight={vizData.edges[idx]}
                    />
                  );
                })}
                {Object.entries(graphData.nodes).map((element) => {
                  const idx = element[0];
                  const node = element[1];
                  return (
                    <Node
                      key={idx}
                      id={idx}
                      position={{ x: node.x + addPos.x, y: node.y + addPos.y }}
                      highlight={vizData.nodes[idx]}
                      tag={tagData[idx]}
                    />
                  );
                })}
              </svg>
            </div>

            <Reproductor speed={speed} setSpeed={setSpeed} />

            <div className="bg-[#efefef] w-full pb-16 pt-10">
              <AlgorithmsController
                currentAlgorithm={currentAlgorithm}
                vizNode={vizNode}
                vizEdge={vizEdge}
                graphData={graphData}
                delayTime={1000 - speed}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                printLog={printLog}
                setTag={setTag}
              />
            </div>

            <LogData logdata={logdata} />
            <SnackbarAlert
              openError={openError}
              setOpenError={setOpenError}
              error={error}
            />
          </div>
        </main>

        {showSelectGraph && (
          <SelectGraph
            sendGraph={setGraphData}
            close={() => {
              setShowSelectGraph(false);
              resetViz();
            }}
          />
        )}
        {showDrawGraph && (
          <DrawGraph
            currentGraph={graphData}
            sendGraph={setGraphData}
            close={() => {
              setShowDrawGraph(false);
              resetViz();
            }}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dijkstra } from "./Dijkstra";
import DijkstraPseudocode from "./DijkstraPseudocode";
import NodeSelector from "../Extra/NodeSelector";
import PlayButton from "../Extra/PlayButton";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
// import SnackbarAlert from "../../Common/SnackbarAlert";

/**
 * DijkstraController component that handles the control logic for the Dijkstra algorithm visualization.
 *
 * @param {Object} props - The component props.
 * @param {string} props.currentAlgorithm - The name of the current algorithm.
 * @param {Object} props.graphData - The data representing the graph.
 * @param {Object} props.vizNode - The visualization settings for nodes.
 * @param {Object} props.vizEdge - The visualization settings for edges.
 * @param {number} props.delayTime - The delay time between visualization steps.
 * @param {boolean} props.isPlaying - Flag indicating if the visualization is currently playing.
 * @param {function} props.setIsPlaying - Function to set the isPlaying flag.
 * @param {function} props.printLog - Function to print log messages.
 * @param {function} props.setTag - Function to set the tag.
 * @returns {JSX.Element} The DijkstraController component.
 */

export default function DijkstraController({
  currentAlgorithm,
  graphData,
  vizNode,
  vizEdge,
  delayTime,
  isPlaying,
  setIsPlaying,
  printLog,
  setTag,
}) {
  const [source, setSource] = useState(""); // State for source node
  const [focusCodeLine, setFocusCodeLine] = useState(); // State for focusing on a line of pseudocode

  // State for handling errors
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState();
  const isBlank = Object.keys(graphData.nodes).length === 0; // Check if graph is blank

  /**
   * Handles the click event when the play button is clicked.
   * Executes the Dijkstra algorithm visualization.
   */
  function handleClick() {
    // Check for various conditions before starting the visualization
    if (isPlaying) {
      setOpenError(true);
      setError("Wait until the visualization is finished");
      return;
    }
    if (isBlank) {
      setOpenError(true);
      setError("Please select or draw a graph first");
      return;
    }
    if (source === "") {
      setOpenError(true);
      setError("Please select source");
      return;
    }
    if (!graphData.isWeighted) {
      setOpenError(true);
      setError("Graph should be weighted for this algorithm");
      return;
    }
    if (negativeEdges()) {
      setOpenError(true);
      setError("Graph should not have negative weights for this algorithm");
      return;
    }
    // If all conditions are satisfied, start the visualization
    setIsPlaying(true);
    Dijkstra(
      graphData,
      Number(source),
      vizNode,
      vizEdge,
      setFocusCodeLine,
      delayTime,
      setIsPlaying,
      printLog,
      setTag
    );
  }

  /**
   * Checks if the graph has any negative edges.
   *
   * @returns {boolean} True if the graph has negative edges, false otherwise.
   */
  function negativeEdges() {
    let ret = false;
    // Check each edge weight, if any edge has a negative weight, return true
    Object.values(graphData.edges).forEach(({ w }) => {
      if (w < 0) ret = true;
    });
    return ret;
  }

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <h3 className="py-8 font-bold text-[24px]">{currentAlgorithm}</h3>
      {/* Render the pseudocode component */}
      <DijkstraPseudocode focusCodeLine={focusCodeLine} />

      <div className="flex justify-end items-center w-full h-[50px] mt-16 gap-5 pr-10">
        {/* NodeSelector component for selecting source node */}
        <NodeSelector
          nodes={Object.keys(graphData.nodes)}
          source={source}
          setSource={setSource}
        />
        {/* PlayButton component for starting the visualization */}
        <PlayButton handleClick={handleClick} />
      </div>

      {/* Snackbar for displaying error messages */}
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenError(false)} severity="warning">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

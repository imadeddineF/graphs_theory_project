/* eslint-disable react/prop-types */
import { useState } from "react";
import { Bfs } from "./Bfs";
import BfsPseudocode from "./BfsPseudocode";
import NodeSelector from "../Extra/NodeSelector";
import PlayButton from "../Extra/PlayButton";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
// import SnackbarAlert from "../../Common/SnackbarAlert";

/**
 * BfsController component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.currentAlgorithm - The current algorithm name.
 * @param {Object} props.graphData - The graph data.
 * @param {Object} props.vizNode - The visualization node data.
 * @param {Object} props.vizEdge - The visualization edge data.
 * @param {number} props.delayTime - The delay time for visualization.
 * @param {boolean} props.isPlaying - Flag indicating if the visualization is currently playing.
 * @param {function} props.setIsPlaying - Function to set the isPlaying flag.
 * @param {function} props.printLog - Function to print log messages.
 * @param {function} props.setTag - Function to set the tag.
 * @returns {JSX.Element} The rendered BfsController component.
 */

export default function BfsController({
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
  // State variables
  const [source, setSource] = useState("");
  const [focusCodeLine, setFocusCodeLine] = useState();

  // Error handling state
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState();
  const isBlank = Object.keys(graphData.nodes).length === 0;

  /**
   * Handles the click event for the play button.
   * Validates the conditions and initiates the BFS algorithm if conditions are met.
   */
  function handleClick() {
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
    if (!source) {
      setOpenError(true);
      setError("Please select source");
      return;
    }
    if (graphData.isWeighted) {
      setOpenError(true);
      setError("Graph should not be weighted for this algorithm");
      return;
    }

    // Set the playing state to true and start BFS
    setIsPlaying(true);
    Bfs(
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

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <h3 className="py-8 font-bold text-[24px]">{currentAlgorithm}</h3>

      <BfsPseudocode focusCodeLine={focusCodeLine} />

      <div className="flex justify-end items-center w-full h-[50px] mt-16 gap-5 pr-10">
        <NodeSelector
          nodes={Object.keys(graphData.nodes)}
          source={source}
          setSource={setSource}
        />
        <PlayButton handleClick={handleClick} />
      </div>

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

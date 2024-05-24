/* eslint-disable react/prop-types */
import { useState } from "react";
import { Kruskal } from "./Kruskal";
import KruskalPseudocode from "./KruskalPseudocode";
import PlayButton from "../Extra/PlayButton";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
// import SnackbarAlert from "../../Common/SnackbarAlert";

/**
 * Renders the KruskalController component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.currentAlgorithm - The current algorithm being used.
 * @param {Object} props.graphData - The data of the graph.
 * @param {Object} props.vizNode - The visualization of the graph nodes.
 * @param {Object} props.vizEdge - The visualization of the graph edges.
 * @param {number} props.delayTime - The delay time for visualization.
 * @param {boolean} props.isPlaying - Indicates if the visualization is currently playing.
 * @param {function} props.setIsPlaying - Function to set the state of isPlaying.
 * @param {function} props.printLog - Function to print log messages.
 * @returns {JSX.Element} The rendered KruskalController component.
 */
export default function KruskalController({
  currentAlgorithm,
  graphData,
  vizNode,
  vizEdge,
  delayTime,
  isPlaying,
  setIsPlaying,
  printLog,
}) {
  const [focusCodeLine, setFocusCodeLine] = useState();
  // Errors
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState();
  const isBlank = Object.keys(graphData.nodes).length === 0;
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
    if (!graphData.isWeighted) {
      setOpenError(true);
      setError("Graph should be weighted for this algorithm");
      return;
    }
    if (graphData.isDirected) {
      setOpenError(true);
      setError("Graph should not be directed for this algorithm");
      return;
    }
    setIsPlaying(true);
    Kruskal(
      graphData,
      vizNode,
      vizEdge,
      setFocusCodeLine,
      delayTime,
      setIsPlaying,
      printLog
    );
  }
  return (
    <div className="flex flex-col items-center justify-center px-2">
      <h3 className="py-8 font-bold text-[24px]">{currentAlgorithm}</h3>
      <KruskalPseudocode focusCodeLine={focusCodeLine} />

      <div className="flex justify-end items-center w-full h-[50px] mt-16 gap-5 pr-10">
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

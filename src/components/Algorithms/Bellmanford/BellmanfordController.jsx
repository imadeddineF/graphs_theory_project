/* eslint-disable react/prop-types */
import { useState } from "react";
import { Bellmanford } from "./Bellmanford";
import BellmanfordPseudocode from "./BellmanfordPseudocode";
import NodeSelector from "../Extra/NodeSelector";
import PlayButton from "../Extra/PlayButton";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
// import SnackbarAlert from "../../Common/SnackbarAlert";

/**
 * BellmanfordController component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.currentAlgorithm - The current algorithm name.
 * @param {Object} props.graphData - The graph data.
 * @param {Object} props.vizNode - The visualization node data.
 * @param {Object} props.vizEdge - The visualization edge data.
 * @param {number} props.delayTime - The delay time for visualization.
 * @param {boolean} props.isPlaying - Indicates if the visualization is currently playing.
 * @param {function} props.setIsPlaying - Function to set the isPlaying state.
 * @param {function} props.printLog - Function to print log.
 * @param {function} props.setTag - Function to set the tag.
 * @returns {JSX.Element} The BellmanfordController component.
 */

export default function BellmanfordController({
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
  const [source, setSource] = useState("");
  const [focusCodeLine, setFocusCodeLine] = useState();
  // Error state
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState("");
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

    if (!source) {
      setOpenError(true);
      setError("Please select source");
      return;
    }

    if (!graphData.isWeighted) {
      setOpenError(true);
      setError("Graph should be weighted for this algorithm");
      return;
    }

    setIsPlaying(true);
    Bellmanford(
      graphData,
      Number(source),
      vizNode,
      vizEdge,
      setFocusCodeLine,
      delayTime,
      setIsPlaying,
      printLog,
      setTag,
      hasNegaCycle
    );
  }

  function hasNegaCycle() {
    setOpenError(true);
    setError("Graph contains a negative-weight cycle");
  }

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <h3 className="py-8 font-bold text-[24px]">{currentAlgorithm}</h3>
      <BellmanfordPseudocode focusCodeLine={focusCodeLine} />

      <div className="flex justify-end items-center w-full h-[50px] mt-16 gap-5 pr-10">
        <NodeSelector
          nodes={Object.keys(graphData.nodes)}
          source={source}
          setSource={setSource}
        />
        <PlayButton handleClick={handleClick} />
      </div>

      {/* Render Alert using Snackbar for better UX */}
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

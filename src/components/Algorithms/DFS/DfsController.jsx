/**
 * DfsController component for controlling the Depth First Search algorithm.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.currentAlgorithm - The name of the current algorithm.
 * @param {Object} props.graphData - The data of the graph.
 * @param {Object} props.vizNode - The visualization settings for nodes.
 * @param {Object} props.vizEdge - The visualization settings for edges.
 * @param {number} props.delayTime - The delay time for visualization.
 * @param {boolean} props.isPlaying - Indicates if the visualization is currently playing.
 * @param {function} props.setIsPlaying - Function to set the playing state.
 * @param {function} props.printLog - Function to print log messages.
 * @param {function} props.setTag - Function to set the tag.
 * @returns {JSX.Element} The rendered DfsController component.
 */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dfs } from "./Dfs";
import DfsPseudocode from "./DfsPseudocode";
import NodeSelector from "../Extra/NodeSelector";
import PlayButton from "../Extra/PlayButton";
import SnackbarAlert from "../../Common/SnackbarAlert";

export default function DfsController({
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
    if (!source) {
      setOpenError(true);
      setError("Please select source");
      return;
    }
    setIsPlaying(true);
    Dfs(
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
    <div className="flex flex-col px-2 items-center justify-center">
      <h3 className="py-8 font-bold text-[24px]">{currentAlgorithm}</h3>
      <DfsPseudocode focusCodeLine={focusCodeLine} />

      <div className="flex justify-end items-center w-full h-[50px] mt-16 gap-5 pr-10">
        <NodeSelector
          nodes={Object.keys(graphData.nodes)}
          source={source}
          setSource={setSource}
        />
        <PlayButton handleClick={handleClick} />
      </div>

      <SnackbarAlert
        openError={openError}
        setOpenError={setOpenError}
        error={error}
      />
    </div>
  );
}

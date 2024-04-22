import React, { useState } from "react";
import { Topsort } from "./Topsort";
import TopsortPseudocode from "./TopsortPseudocode";
import PlayButton from "../Extra/PlayButton";
import SnackbarAlert from "../../Common/SnackbarAlert";

export default function TopsortController({
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
    if (!graphData.isDirected) {
      setOpenError(true);
      setError("Graph should be directed for this algorithm");
      return;
    }
    setIsPlaying(true);
    Topsort(
      graphData,
      vizNode,
      vizEdge,
      setFocusCodeLine,
      delayTime,
      setIsPlaying,
      printLog,
      setTag,
      isNotDag
    );
  }
  function isNotDag() {
    setOpenError(true);
    setError(
      "Topological sort is not possible, graph needs to be a directed acyclic graph (DAG)"
    );
  }
  return (
    <div className="flex flex-col px-2 items-center justify-center">
      <h3 className="py-8 font-bold text-[24px]">{currentAlgorithm}</h3>
      <TopsortPseudocode focusCodeLine={focusCodeLine} />

      <div className="flex justify-end items-center w-full h-[50px] mt-16 gap-5 pr-10">
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

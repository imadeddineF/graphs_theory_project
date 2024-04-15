import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function PlayButton({ handleClick }) {
  return (
    <div className="play-button" onClick={handleClick}>
      <h2>Play!</h2>
      <PlayArrowIcon style={{ fontSize: "1rem", marginTop: "0.1rem" }} />
    </div>
  );
}

import React from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

export default function Back({ close }) {
  return (
    <div className="select-graph-button" onClick={close}>
      <BackspaceIcon style={{ fontSize: "1rem", marginTop: "3px" }} />
      <h3>Back</h3>
    </div>
  );
}

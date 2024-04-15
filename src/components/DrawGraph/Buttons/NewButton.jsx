import React from "react";
import RestoreIcon from "@mui/icons-material/Restore";

export default function NewButton({ resetGraph }) {
  return (
    <div className="draw-graph-button" onClick={resetGraph}>
      <h3>New</h3>
      <RestoreIcon style={{ fontSize: "1.2rem", marginTop: "0.1rem" }} />
    </div>
  );
}

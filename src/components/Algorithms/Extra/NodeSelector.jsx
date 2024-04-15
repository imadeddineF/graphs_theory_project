import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const color = "white";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 150,
    },
  },
};

export default function NodeSelector({ nodes, source, setSource }) {
  const handleChangeSource = (event) => {
    setSource(event.target.value);
  };

  return (
    <FormControl
      style={{ margin: "8px", minWidth: "150px", maxWidth: "200px" }}
    >
      <InputLabel style={{ color: color }}>Source</InputLabel>
      <Select
        style={{
          "&:before": { borderColor: color },
          "&:after": { borderColor: color },
          "&:hover": { borderColor: color },
          color: color,
        }}
        value={source}
        onChange={handleChangeSource}
        label="Source"
        MenuProps={MenuProps}
        inputProps={{ style: { fill: color } }}
      >
        {nodes.map((node, idx) => (
          <MenuItem key={idx} value={node}>
            {node}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
    <FormControl className="w-[80%]" style={{ marginTop: "20px" }}>
      <InputLabel style={{ color: "white", borderColor: "white" }}>
        Source
      </InputLabel>

      <Select
        style={{
          borderColor: "white",
          color: "white",
        }}
        value={source}
        onChange={handleChangeSource}
        label="Source"
        MenuProps={MenuProps}
        inputProps={{ style: { fill: "white" } }}
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

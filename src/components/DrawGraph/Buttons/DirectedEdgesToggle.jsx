import Switch from "@mui/material/Switch";

export default function DirectedEdgesToggle({ isDirected, setIsDirected }) {
  return (
    <div className=" flex items-center gap-2 text-white font-bold">
      Directed edges
      <Switch
        checked={isDirected}
        onChange={(e) => {
          setIsDirected(e.target.checked);
        }}
        color="secondary"
      />
    </div>
  );
}

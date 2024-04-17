import Switch from "@mui/material/Switch";

export default function WeightedEdgesToggle({ isWeighted, setIsWeighted }) {
  return (
    <div className="flex items-center gap-2 text-white font-bold">
      Weighted edges
      <Switch
        checked={isWeighted}
        onChange={(e) => {
          setIsWeighted(e.target.checked);
        }}
        color="secondary"
      />
    </div>
  );
}

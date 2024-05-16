/**
 * Toggle component for directed edges.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isDirected - Flag indicating whether the edges are directed.
 * @param {function} props.setIsDirected - Function to set the value of isDirected.
 * @returns {JSX.Element} - The DirectedEdgesToggle component.
 */

/* eslint-disable react/prop-types */
import Switch from "@mui/material/Switch";

export default function DirectedEdgesToggle({ isDirected, setIsDirected }) {
  return (
    <div className=" flex items-center gap-2 text-white font-bold">
      Arêtes orientées
      <Switch
        checked={isDirected}
        onChange={(e) => {
          setIsDirected(e.target.checked);
        }}
        color="primary"
      />
    </div>
  );
}

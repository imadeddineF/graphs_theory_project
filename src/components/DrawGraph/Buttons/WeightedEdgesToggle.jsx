/* eslint-disable react/prop-types */
import Switch from "@mui/material/Switch";

/**
 * Toggle component for weighted edges.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isWeighted - Indicates whether the edges are weighted or not.
 * @param {Function} props.setIsWeighted - Callback function to update the state of `isWeighted`.
 * @returns {JSX.Element} - The rendered component.
 */

export default function WeightedEdgesToggle({ isWeighted, setIsWeighted }) {
  return (
    <div className="flex items-center gap-2 font-bold text-white">
      Arêtes pondérées
      <Switch
        checked={isWeighted}
        onChange={(e) => {
          setIsWeighted(e.target.checked);
        }}
        color="primary"
      />
    </div>
  );
}

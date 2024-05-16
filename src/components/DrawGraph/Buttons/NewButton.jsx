/* eslint-disable react/prop-types */
import RestoreIcon from "@mui/icons-material/Restore";

/**
 * Renders a NewButton component.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.resetGraph - The function to reset the graph.
 * @returns {JSX.Element} The rendered NewButton component.
 */

export default function NewButton({ resetGraph }) {
  return (
    <button
      className="bg-primary5 px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-primary5hover transition-all duration-300 text-primaryTextBtn font-bold"
      onClick={resetGraph}
    >
      New
      <RestoreIcon style={{ fontSize: "1.2rem", marginTop: "0.1rem" }} />
    </button>
  );
}

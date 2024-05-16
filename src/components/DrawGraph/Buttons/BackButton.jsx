/* eslint-disable react/prop-types */
import BackspaceIcon from "@mui/icons-material/Backspace";

/**
 * Represents a back button component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.close - The function to be called when the button is clicked.
 * @returns {JSX.Element} The back button component.
 */

export default function Back({ close }) {
  return (
    <button
      className="bg-primary5 text-primaryTextBtn px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-primary5hover transition-all duration-300 font-bold"
      onClick={close}
    >
      <BackspaceIcon style={{ fontSize: "1rem", marginTop: "0.15rem" }} />
      Retour
    </button>
  );
}

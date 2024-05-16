/* eslint-disable react/prop-types */
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

/**
 * Renders a play button component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.handleClick - The click event handler for the button.
 * @returns {JSX.Element} The rendered PlayButton component.
 */
export default function PlayButton({ handleClick }) {
  return (
    <button
      className="bg-primary5 text-white rounded-lg h-full px-7 flex items-center gap-3 hover:bg-primary5hover duration-300 transition-all w-fit font-bold text-[18px]"
      onClick={handleClick}
    >
      Play!
      <PlayArrowIcon style={{ fontSize: "1rem", marginTop: "0.1rem" }} />
    </button>
  );
}

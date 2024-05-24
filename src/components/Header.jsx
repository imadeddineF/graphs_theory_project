/* eslint-disable react/prop-types */
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { MoonIcon, SunIcon } from "../icons";
// import UseThemeSwitcher from "../hooks/useThemeSwitcher";

/**
 * Header component for the Graph Algorithms Visualizer.
 * @param {Object} props - The component props.
 * @param {Function} props.setShowDrawGraph - Function to set the state of showing the draw graph component.
 * @param {Function} props.setShowSelectGraph - Function to set the state of showing the select graph component.
 * @param {Function} props.setOpenError - Function to set the state of opening the error dialog.
 * @param {Function} props.setError - Function to set the error message.
 * @param {boolean} props.isPlaying - Flag indicating if the visualization is currently playing.
 * @returns {JSX.Element} The rendered Header component.
 */

export default function Header({
  setShowDrawGraph,
  setShowSelectGraph,
  setOpenError,
  setError,
  isPlaying,
}) {
  // add the switcher icon
  // const [mode, setMode] = UseThemeSwitcher("");

  /**
   * Handles the click event on the buttons.
   * @param {string} button - The button identifier.
   */
  function handleClick(button) {
    if (isPlaying) {
      setOpenError(true);
      setError("Wait until the visualization is finished");
      return;
    }
    if (button === "select") setShowSelectGraph(true);
    if (button === "draw") setShowDrawGraph(true);
  }

  return (
    <header className="top-0 flex items-center justify-between w-full text-white bg-primary3">
      <div className="relative h-full p-6 bg-primary5">
        <h1 className="font-bold text-[24px]">Graph Algorithms Visualizer</h1>
        <div className=" absolute bg-primary3 -right-10 top-0 h-full border-[42px] border-primary3 border-l-primary5 border-r-0" />
      </div>

      <div className="flex items-center gap-4 mr-4">
        <button
          className="flex items-center gap-2 text-[18px] bg-primary5 text-primaryTextBtn font-semibold rounded-md px-4 py-3 hover:bg-primary5hover  transition duration-300"
          onClick={() => handleClick("select")}
        >
          <h2>Sélectionner un graphe</h2>
          <ArrowForwardIosIcon
            style={{ fontSize: "1rem", marginTop: "0.1rem" }}
          />
        </button>

        <button
          className="flex items-center gap-2 text-[18px] bg-primary5 text-primaryTextBtn font-semibold rounded-md px-4 py-3 hover:bg-primary5hover transition duration-300"
          onClick={() => handleClick("draw")}
        >
          <h2>Dessiner un graphe</h2>
          <EditIcon style={{ fontSize: "1.2rem", marginTop: "0.1rem" }} />
        </button>
      </div>
    </header>
  );
}

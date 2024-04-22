import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { MoonIcon, SunIcon } from "../icons";
// import UseThemeSwitcher from "../hooks/useThemeSwitcher";

export default function Header({
  setShowDrawGraph,
  setShowSelectGraph,
  setOpenError,
  setError,
  isPlaying,
}) {
  // add the switcher icon
  // const [mode, setMode] = UseThemeSwitcher("");

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
    <header className="w-full top-0 flex justify-between items-center bg-primary3  text-white">
      <div className="bg-primary5 h-full p-6 relative">
        <h1 className="font-bold text-[24px]">Graph Algorithms Visualizer</h1>
        <div className=" absolute bg-primary3 -right-10 top-0 h-full border-[42px] border-primary3 border-l-primary5 border-r-0" />
      </div>

      <div className="flex items-center gap-4 mr-4">
        {/* Add Dark Theme Button Switcher */}
        {/* <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={`flex items-center justify-center p-1 ml-3 rounded-full ${
            mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
          }`}
        >
          {mode === "dark" ? (
            <SunIcon className={"fill-dark"} />
          ) : (
            <MoonIcon className={"fill-dark"} />
          )}
        </button> */}

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

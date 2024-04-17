import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Header({
  setShowDrawGraph,
  setShowSelectGraph,
  setOpenError,
  setError,
  isPlaying,
}) {
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
    <header className="w-full top-0 p-3 flex justify-between items-center bg-[#3f72af] text-white border-b-[1px] border-b-[#06121f]">
      <h1 className="font-bold text-[20px]">Graph Algorithms Visualizer</h1>
      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-2 bg-white text-[#112d4e] rounded-md px-4 py-1"
          onClick={() => handleClick("select")}
        >
          <h2>Select graph</h2>
          <ArrowForwardIosIcon
            style={{ fontSize: "1rem", marginTop: "0.1rem" }}
          />
        </button>

        <button
          className="flex items-center gap-2 bg-white text-[#112d4e] rounded-md px-4 py-1"
          onClick={() => handleClick("draw")}
        >
          <h2>Draw graph</h2>
          <EditIcon style={{ fontSize: "1.2rem", marginTop: "0.1rem" }} />
        </button>
      </div>
    </header>
  );
}

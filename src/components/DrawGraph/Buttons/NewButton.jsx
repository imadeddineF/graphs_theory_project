import RestoreIcon from "@mui/icons-material/Restore";

export default function NewButton({ resetGraph }) {
  return (
    <button
      className="bg-primary5 px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-primary5hover transition-all duration-300 text-white font-bold"
      onClick={resetGraph}
    >
      New
      <RestoreIcon style={{ fontSize: "1.2rem", marginTop: "0.1rem" }} />
    </button>
  );
}

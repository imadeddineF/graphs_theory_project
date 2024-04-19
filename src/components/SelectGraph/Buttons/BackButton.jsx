import BackspaceIcon from "@mui/icons-material/Backspace";

export default function Back({ close }) {
  return (
    <button
      className="bg-primary4 px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-[#033369] transition-all duration-300 text-white font-bold"
      onClick={close}
    >
      <BackspaceIcon style={{ fontSize: "1rem", marginTop: "3px" }} />
      Cancel
    </button>
  );
}

import BackspaceIcon from "@mui/icons-material/Backspace";

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

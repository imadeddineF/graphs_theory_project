import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function PlayButton({ handleClick }) {
  return (
    <button
      className="bg-white rounded-lg py-2 px-7 flex items-center gap-3 hover:bg-slate-200 duration-300 transition-all font-bold text-[18px] mt-5"
      onClick={handleClick}
    >
      Play!
      <PlayArrowIcon style={{ fontSize: "1rem", marginTop: "0.1rem" }} />
    </button>
  );
}

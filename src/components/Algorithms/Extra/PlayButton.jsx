import PlayArrowIcon from "@mui/icons-material/PlayArrow";

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

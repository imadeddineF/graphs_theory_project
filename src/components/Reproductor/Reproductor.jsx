import SpeedSlider from "./SpeedSlider";
import SpeedIcon from "@mui/icons-material/Speed";

export default function Reproductor({ speed, setSpeed }) {
  return (
    <div className="border-2 border-green-500 flex justify-center">
      <div className="flex items-center w-[300px] gap-3 py-2">
        <p>Speed</p>
        <SpeedSlider speed={speed} setSpeed={setSpeed} />
        <SpeedIcon />
      </div>
    </div>
  );
}

import SpeedSlider from "./SpeedSlider";
import SpeedIcon from "@mui/icons-material/Speed";

export default function Reproductor({ speed, setSpeed }) {
  return (
    <div className="bg-speed flex justify-center">
      <div className="flex items-center w-[300px] gap-3 py-4">
        <p className="text-white mr-3">Speed</p>
        <SpeedSlider speed={speed} setSpeed={setSpeed} />
        <SpeedIcon className="text-white ml-1" />
      </div>
    </div>
  );
}

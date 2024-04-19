import SpeedSlider from "./SpeedSlider";
import SpeedIcon from "@mui/icons-material/Speed";

export default function Reproductor({ speed, setSpeed }) {
  return (
    <div className=" bg-speed border-2 border-green-500 flex justify-center">
      <div className="flex items-center w-[300px] gap-3 py-2">
        <p className="text-white">Speed</p>
        <SpeedSlider speed={speed} setSpeed={setSpeed} />
        <SpeedIcon className="text-white" />
      </div>
    </div>
  );
}

/* eslint-disable react/prop-types */
import SpeedSlider from "./SpeedSlider";
import SpeedIcon from "@mui/icons-material/Speed";

/**
 * Reproductor component.
 *
 * @param {Object} props - The component props.
 * @param {number} props.speed - The current speed value.
 * @param {function} props.setSpeed - The function to update the speed value.
 * @returns {JSX.Element} The Reproductor component.
 */

export default function Reproductor({ speed, setSpeed }) {
  return (
    <div className="bg-speed flex justify-center">
      <div className="flex items-center w-[400px] gap-3 py-5">
        <p className="text-black font-medium text-[18px] mr-3">Speed</p>
        <SpeedSlider speed={speed} setSpeed={setSpeed} />
        <SpeedIcon className="text-black ml-1" />
      </div>
    </div>
  );
}

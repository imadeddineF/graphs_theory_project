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
  function calculateSpeed(speed) {
    return (50 / speed).toFixed(2); // Calculate nodes per second
  }

  return (
    <div className="flex justify-center bg-speed">
      <div className="flex items-center w-[420px] gap-3 py-5">
        <p className="text-black font-medium text-[18px] mr-3">Speed</p>
        <SpeedSlider speed={speed} setSpeed={setSpeed} />
        <p className=" text-nowrap">
          <span className="font-bold">{calculateSpeed(speed)}</span> n/s
        </p>
        <SpeedIcon className="ml-1 text-black" />
      </div>
    </div>
  );
}

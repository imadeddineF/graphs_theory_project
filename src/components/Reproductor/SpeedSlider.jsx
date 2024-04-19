import Slider from "@mui/material/Slider";

export default function SpeedSlider({ speed, setSpeed }) {
  const handleChange = (event, newValue) => {
    setSpeed(newValue);
  };

  const sliderStyles = {
    root: {
      width: 300,
      color: "#12f5f5",
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    valueLabel: {
      left: "calc(-50% + 4px)",
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  };

  return (
    <Slider
      value={speed}
      onChange={handleChange}
      aria-labelledby="continuous-slider"
      min={50}
      max={500}
      step={1}
      sx={sliderStyles}
    />
  );
}

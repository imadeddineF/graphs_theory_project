import React from "react";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import SpeedIcon from "@mui/icons-material/Speed";

export default function SpeedSlider({ speed, setSpeed }) {
  const handleChange = (event, newValue) => {
    setSpeed(newValue);
  };

  const sliderStyles = {
    root: {
      width: 300,
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
    <div style={{ width: 300 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <p style={{ marginTop: "0.7rem" }}>Speed</p>
        </Grid>
        <Grid item xs>
          <Slider
            value={speed}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
            min={200}
            max={900}
            step={1}
            sx={sliderStyles}
          />
        </Grid>
        <Grid item>
          <SpeedIcon />
        </Grid>
      </Grid>
    </div>
  );
}

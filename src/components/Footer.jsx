import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <div className="footer">
      <p>© 2024 Made by 3imad</p>
      <LinkedInIcon
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/gonzalo-pereira-ramirez-8818a5195/"
          )
        }
      />
      <GitHubIcon
        onClick={() =>
          window.open("https://github.com/GonzaloPereira/graph-visualizer")
        }
      />
    </div>
  );
}

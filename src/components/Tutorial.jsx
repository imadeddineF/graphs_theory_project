import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Tutorial({ close }) {
  return (
    <div className="tutorial">
      <img src="/assets/images/tutorial.png" alt="Tutorial" />
      <div className="tutorial-button" onClick={close}>
        <h3>I got it!</h3>
        <CheckCircleIcon style={{ fontSize: "1.6rem" }} />
      </div>
    </div>
  );
}

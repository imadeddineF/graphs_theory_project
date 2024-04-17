import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Tutorial({ close }) {
  return (
    <div className="w-full h-screen bg-[#0a1b2c]">
      <img
        className="max-h-full max-w-full"
        src="/assets/images/tutorial.png"
        alt="Tutorial"
      />
      <div
        className="text-white w-[140px] h-[30px] fixed top-[5%] left-[50%] -ml-[75px] py-[8px] px-[4px] flex justify-evenly items-center bg-[#dd024e] rounded-md shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out hover:scale-105"
        onClick={close}
      >
        <h3 className="m-0 font-semibold">I got it!</h3>
        <CheckCircleIcon style={{ fontSize: "1.6rem" }} />
      </div>
    </div>
  );
}

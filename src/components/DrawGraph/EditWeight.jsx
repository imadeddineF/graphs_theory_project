/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

/**
 * Component for editing the weight of an edge.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.currentEdge - The current edge being edited.
 * @param {Function} props.setCurrentEdge - The function to set the current edge.
 * @param {Function} props.handleSubmit - The function to handle form submission.
 * @returns {JSX.Element} The EditWeight component.
 */

export default function EditWeight({
  currentEdge,
  setCurrentEdge,
  handleSubmit,
}) {
  const newWeight = useRef();
  useEffect(() => {
    if (newWeight.current) newWeight.current.focus();
  }, []);
  return (
    <form
      className="-mt-28 ml-5 shadow-md w-fit py-2 px-4 rounded-md bg-[#efefef] z-10"
      onSubmit={(e) => {
        e.preventDefault();
        if (newWeight.current.value === "") return;
        handleSubmit(currentEdge, newWeight.current.value);
        setCurrentEdge(null);
      }}
    >
      <h2 className="mb-2">Modifier le poids:</h2>
      <div className="flex items-center gap-2">
        <input
          className="rounded-lg py-2 outline-none px-3 w-40 shadow-md"
          type="number"
          ref={newWeight}
          autoFocus
        />
        <button
          className="bg-primary5 rounded-full h-10 w-10 flex justify-center items-center hover:bg-primary5hover transition duration-300"
          type="submit"
        >
          <ArrowForwardIcon
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              marginTop: "2px",
              color: "white",
            }}
          />
        </button>
      </div>
    </form>
  );
}

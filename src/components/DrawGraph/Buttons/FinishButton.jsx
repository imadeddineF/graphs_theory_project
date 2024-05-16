/* eslint-disable react/prop-types */
/**
 * A button component used to finish an action.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.finish - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered FinishButton component.
 */

export default function FinishButton({ finish }) {
  return (
    <button
      className="bg-primary5  px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-[primary5hover transition-all duration-300 text-primaryTextBtn font-bold"
      onClick={finish}
    >
      Terminer
    </button>
  );
}

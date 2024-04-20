export default function SelectButton({ finish }) {
  return (
    <button
      className="bg-primary5 px-5 py-3 rounded-lg hover:bg-primary5hover transition-all duration-300 text-white font-bold"
      onClick={finish}
    >
      Select
    </button>
  );
}

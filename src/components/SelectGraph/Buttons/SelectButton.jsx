export default function SelectButton({ finish }) {
  return (
    <button
      className="bg-primary4 px-5 py-3 rounded-lg hover:bg-[#033369] transition-all duration-300 text-white font-bold"
      onClick={finish}
    >
      Select
    </button>
  );
}

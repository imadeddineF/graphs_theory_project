export default function FinishButton({ finish }) {
  return (
    <button
      className="bg-[#112d4e] px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-[#033369] transition-all duration-300 text-white font-bold"
      onClick={finish}
    >
      Finish
    </button>
  );
}

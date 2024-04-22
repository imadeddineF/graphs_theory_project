export default function FinishButton({ finish }) {
  return (
    <button
      className="bg-primary5  px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-[primary5hover transition-all duration-300 text-white font-bold"
      onClick={finish}
    >
      Terminer
    </button>
  );
}

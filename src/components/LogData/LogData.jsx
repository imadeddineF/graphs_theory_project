export default function LogData({ logdata }) {
  return (
    <div className=" bg-logData border-2 border-blue-700 p-2 h-[1000px]">
      {logdata
        .slice(0)
        .reverse()
        .map((line, idx) => {
          return (
            <p
              className="text-sm text-left ml-16 mt-1 mb-1 font-sans font-normal"
              key={idx}
            >
              {line}
            </p>
          );
        })}
    </div>
  );
}

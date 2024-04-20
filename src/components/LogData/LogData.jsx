export default function LogData({ logdata }) {
  return (
    <div className="bg-logData p-8">
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

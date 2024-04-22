export default function LogData({ logdata }) {
  const length = logdata.length;
  return (
    <div className="bg-logData p-20 pt-16 min-h-[200px]">
      <h1 className="text-center text-[24px] font-bold mb-8">Les Données</h1>
      {logdata.length === 0 ? (
        <div className="bg-black text-white p-6 rounded-md">
          <h2 className="text-[18px] text-center">Aucune donnée à afficher!</h2>
        </div>
      ) : (
        <>
          <h2 className="font-bold  text-[18px] text-[#7f54bf]">
            {logdata[0]}
          </h2>
          <ul className="flex flex-col text-[15px] gap-2 mx-[160px] justify-center my-6 bg-black text-white p-6 rounded-md">
            {logdata.slice(1, length).map((line, idx) => {
              return (
                <li key={idx}>
                  {line !== "done" && (
                    <>
                      <span className="mr-2 font-medium text-[#28d93d]">
                        {idx + 1}-
                      </span>
                      <span>{line}</span>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
          {logdata[length - 1] === "done" && (
            <h2 className="font-bold text-[18px] text-[#7f54bf]">Terminé!</h2>
          )}
        </>
      )}
    </div>
  );
}

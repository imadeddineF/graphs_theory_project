import { useState } from "react";
import BackButton from "./Buttons/BackButton";
import SelectButton from "./Buttons/SelectButton";
import Card from "./Card";
import { graphList } from "./graphList";
import CloseIcon from "@mui/icons-material/Close";

export default function SelectGraph({ close, sendGraph }) {
  const [graphData, setGraphData] = useState(null);
  const [current, setCurrent] = useState(null);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-[#00000080] overflow-auto z-10">
      <div className="bg-primary3 min-h-[90%] w-[90%] m-auto mt-5 text-white rounded-md">
        <div className="flex justify-between items-center px-5 py-5">
          <h2 className="font-bold text-[24px]">Graph Examples</h2>
          <button className="border border-white p-1  h-fit rounded-full hover:scale-105 transition-all duration-300">
            <CloseIcon className="text-white" onClick={close} />
          </button>
        </div>

        <div className="p-6 pt-0 grid grid-cols-3 overflow-y-scroll justify-around gap-6">
          {graphList.map((graph, idx) => {
            return (
              <Card
                key={idx}
                graphData={graph}
                id={idx}
                selected={idx === current}
                setCurrent={setCurrent}
                setGraphData={setGraphData}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3 mt-10 p-3">
          <BackButton close={close} />
          <SelectButton
            finish={() => {
              if (graphData) sendGraph(graphData);
              close();
            }}
          />
        </div>
      </div>
    </div>
  );
}

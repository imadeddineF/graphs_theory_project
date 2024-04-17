import React, { useState } from "react";
import BackButton from "./Buttons/BackButton";
import SelectButton from "./Buttons/SelectButton";
import Card from "./Card";
import { graphList } from "./graphList";

export default function SelectGraph({ close, sendGraph }) {
  const [graphData, setGraphData] = useState(null);
  const [current, setCurrent] = useState(null);
  return (
    <div className="popup-out">
      <div className=" bg-[#3f72af] min-h-[90%] w-[90%] m-auto mt-5 text-white rounded-md">
        <h2 className="p-5 font-bold text-[24px]">Graph Examples</h2>

        <div className="p-3 flex flex-wrap overflow-y-scroll justify-around gap-x-8 gap-y-8 ">
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

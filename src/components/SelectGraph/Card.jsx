import CardEdge from "./CardEdge";
import CardNode from "./CardNode";

export default function Card({
  id,
  graphData,
  selected,
  setCurrent,
  setGraphData,
}) {
  function findEdgeId(u, v) {
    return Object.keys(graphData.edges).find(
      (id) =>
        Number(graphData.edges[id].u) === Number(u) &&
        Number(graphData.edges[id].v) === Number(v)
    );
  }
  function select() {
    setCurrent(id);
    setGraphData(graphData);
  }
  const selectedStyle = { border: selected ? "solid #F54748 3px" : "" };
  return (
    <div
      className="card bg-[#f9f7f7] rounded-md w-[380px] h-[200px] shadow-md overflow-hidden cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-lg"
      onClick={select}
      style={selectedStyle}
    >
      <svg className="scale-[0.4] origin-top-left w-[900px] h-[500px]">
        {Object.entries(graphData.edges).map((element) => {
          const idx = element[0];
          const edge = element[1];
          return (
            <CardEdge
              key={idx}
              id={idx}
              edge={edge}
              position={{
                x1: graphData.nodes[edge.u].x,
                y1: graphData.nodes[edge.u].y,
                x2: graphData.nodes[edge.v].x,
                y2: graphData.nodes[edge.v].y,
              }}
              isWeighted={graphData.isWeighted}
              isDirected={graphData.isDirected}
              isCurved={findEdgeId(edge.v, edge.u) !== undefined}
            />
          );
        })}
        {Object.entries(graphData.nodes).map((element) => {
          const idx = element[0];
          const node = element[1];
          return (
            <CardNode key={idx} id={idx} position={{ x: node.x, y: node.y }} />
          );
        })}
      </svg>
    </div>
  );
}

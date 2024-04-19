import SubMenu from "./SubMenu";

export default function Menu({ setCurrentAlgorithm }) {
  const algorithms = [
    [
      "Elementary Graph Algorithms",
      ["Breadth-first search", "Depth-first search", "Topological sort"],
    ],
    [
      "Single-Source Shortest Paths",
      [
        "Breadth-first search",
        "Dijkstra’s algorithm",
        "Bellman-Ford algorithm",
      ],
    ],
    ["Minimum Spanning Trees", ["Kruskal", "Prim"]],
  ];
  return (
    <div className="bg-primary2 text-white text-left over h-full">
      <h2 className="text-[20px] border-b-[1px] m-0 py-4 px-3">Algorithms</h2>
      {/* Elementary Graph Algorithms */}
      <SubMenu
        title={algorithms[0][0]}
        list={algorithms[0][1]}
        setCurrentAlgorithm={setCurrentAlgorithm}
      />
      {/* Minimum Spanning Trees */}
      <SubMenu
        title={algorithms[1][0]}
        list={algorithms[1][1]}
        setCurrentAlgorithm={setCurrentAlgorithm}
      />
      {/* Single-Source Shortest Paths */}
      <SubMenu
        title={algorithms[2][0]}
        list={algorithms[2][1]}
        setCurrentAlgorithm={setCurrentAlgorithm}
      />
    </div>
  );
}

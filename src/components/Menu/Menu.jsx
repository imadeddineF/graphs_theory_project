import SubMenu from "./SubMenu";

export default function Menu({ setCurrentAlgorithm }) {
  const algorithms = [
    [
      "Algorithmes élémentaires",
      ["Recherche en largeur", "Recherche en profondeur", "Tri topologique"],
    ],
    [
      "Chemins les plus courts à partir d'une source unique",
      ["L'algorithme de Dijkstra", "L'algorithme de Bellman-Ford"],
    ],
    [
      "Arbres couvrants de poids minimum",
      ["L'algorithme de Kruskal", "L'algorithme de Prim"],
    ],
  ];
  return (
    <div className="bg-primary2 text-white text-left over h-full">
      <h2 className="text-[20px] font-medium border-b-[1px] m-0 py-5 px-3">
        Algorithmes
      </h2>
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

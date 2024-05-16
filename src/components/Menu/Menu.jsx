/* eslint-disable react/prop-types */
import SubMenu from "./SubMenu";

/**
 * Menu component displays a list of algorithms and their submenus.
 * @param {Object} props - The component props.
 * @param {Function} props.setCurrentAlgorithm - Callback function to set the current algorithm.
 * @returns {JSX.Element} The rendered Menu component.
 */

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
    <div className=" bg-primary5 flex flex-col gap-1 text-white text-left over h-full">
      <h2 className="text-[24px] text-primaryTextBtn font-medium border-t-[1px] border-white m-0 py-[22px] px-3">
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

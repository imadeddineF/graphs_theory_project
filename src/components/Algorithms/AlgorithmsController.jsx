/* eslint-disable react/prop-types */
import BfsController from "./BFS/BfsController";
import DijkstraController from "./Dijkstra/DijkstraController";
import DfsController from "./DFS/DfsController";
import TopsortController from "./Topsort/TopsortController";
import BellmanfordController from "./Bellmanford/BellmanfordController";
import KruskalController from "./Kruskal/KruskalController";
import PrimController from "./Prim/PrimController";

export default function AlgorithmsController(props) {
  /**
   * Returns the component corresponding to the given algorithm.
   *
   * @param {string} currentAlgorithm - The name of the algorithm.
   * @returns {React.Component} The component corresponding to the algorithm.
   */

  function getAlgorithm(currentAlgorithm) {
    switch (currentAlgorithm) {
      case "Recherche en largeur":
        return <BfsController {...props} />;
      case "Recherche en profondeur":
        return <DfsController {...props} />;
      case "Tri topologique":
        return <TopsortController {...props} />;
      case "L'algorithme de Dijkstra":
        return <DijkstraController {...props} />;
      case "L'algorithme de Bellman-Ford":
        return <BellmanfordController {...props} />;
      case "L'algorithme de Kruskal":
        return <KruskalController {...props} />;
      case "L'algorithme de Prim":
        return <PrimController {...props} />;
      default:
        return;
    }
  }
  return <div className="h-full">{getAlgorithm(props.currentAlgorithm)}</div>;
}

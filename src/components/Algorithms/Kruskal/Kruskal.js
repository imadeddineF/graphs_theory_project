import { delay } from "../Extra/Extra";

/**
 * Executes the Kruskal's algorithm on the given graph data.
 *
 * @param {object} graphData - The graph data containing nodes and edges.
 * @param {function} vizNode - The visualization function for nodes.
 * @param {function} vizEdge - The visualization function for edges.
 * @param {function} setFocusCodeLine - The function to set the focus on a specific line of code.
 * @param {number} delayTime - The delay time between each step of the algorithm.
 * @param {function} setIsPlaying - The function to set the playing state of the algorithm.
 * @param {function} printLog - The function to print logs during the algorithm execution.
 * @returns {Promise<void>} - A promise that resolves when the algorithm execution is complete.
 */

export async function Kruskal(
  graphData,
  vizNode,
  vizEdge,
  setFocusCodeLine,
  delayTime,
  setIsPlaying,
  printLog
) {
  const topNode = graphData.topNode;
  const isDirected = graphData.isDirected;

  const edges = Object.values(graphData.edges).map(({ u, v, w }) => {
    return { u: Number(u), v: Number(v), w: Number(w) };
  });

  // Kruskal starts here
  await delay(50);
  printLog("L'algorithme de Kruskal: ");

  edges.forEach((edge) => {
    vizEdge(edge.u, edge.v, "transparent", isDirected);
  });

  const size = []; //Sizes of components
  const P = []; //Parents of nodes

  for (let i = 0; i < topNode; i++) {
    P.push(i);
  }

  edges.sort((firstEdge, secondEdge) => firstEdge.w - secondEdge.w);
  let totalWeight = 0;
  let components = Object.keys(graphData.nodes).length;

  for (let i = 0; i < edges.length; i++) {
    const { u, v, w } = edges[i];
    //Visualization
    setFocusCodeLine();
    await delay(delayTime / 5);

    if (find(u) === find(v)) {
      //Visualization
      vizEdge(u, v, "red", isDirected);
      printLog(`${u} et ${v} sont déjà connectés`);
      await delay(delayTime);
      vizEdge(u, v, "transparent", isDirected);
    } else {
      totalWeight += w;
      components--;

      //Visualization
      vizNode(u, "blue");
      vizNode(v, "blue");
      vizEdge(u, v, "blue", isDirected);
      printLog(`Join ${u} and ${v}`);
      setFocusCodeLine(5);
      await delay(delayTime);
    }
    union(find(u), find(v));
  }

  if (components > 1)
    printLog(
      `Forêt couvrante minimale trouvée : Poids total = ${totalWeight} -> Nombre d'arbres = ${components}`
    );
  else printLog(`Arbre couvrant minimal trouvé : Poids total = ${totalWeight}`);
  printLog("done");
  setIsPlaying(false);

  function find(u) {
    if (P[u] === u) return u;
    return (P[u] = find(P[u]));
  }

  function union(u, v) {
    if (P[u] === P[v]) return;
    if (size[u] < size[v]) [u, v] = [v, u];
    P[v] = u;
    size[u] += size[v];
  }
}

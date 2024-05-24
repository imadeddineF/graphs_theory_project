import { delay } from "../Extra/Extra";

/**
 * Runs the Bellman-Ford algorithm on a given graph.
 *
 * @param {object} graphData - The graph data object.
 * @param {number} source - The source node.
 * @param {function} vizNode - The visualization function for nodes.
 * @param {function} vizEdge - The visualization function for edges.
 * @param {function} setFocusCodeLine - The function to set the focus code line.
 * @param {number} delayTime - The delay time for visualization.
 * @param {function} setIsPlaying - The function to set the playing state.
 * @param {function} printLog - The function to print logs.
 * @param {function} setTag - The function to set tags.
 * @param {function} hasNegaCycle - The function to check if the graph has a negative cycle.
 * @returns {Promise<void>} - A promise that resolves when the algorithm is done.
 */
export async function Bellmanford(
  graphData,
  source,
  vizNode,
  vizEdge,
  setFocusCodeLine,
  delayTime,
  setIsPlaying,
  printLog,
  setTag,
  hasNegaCycle
) {
  // Extract necessary graph properties
  const topNode = graphData.topNode;
  const isDirected = graphData.isDirected;
  const edges = Object.values(graphData.edges).map(({ u, v, w }) => {
    return { u: Number(u), v: Number(v), w: Number(w) };
  });

  // Initial delay and log for starting the algorithm
  await delay(50);
  printLog("L'algorithme de Bellman-Ford:");

  // Initialize distance and parent arrays
  const D = []; // Distance
  const P = []; // Parents
  const cntNodes = Object.keys(graphData.nodes).length; // Number of nodes

  // Set initial distances to infinity and parents to null
  for (let i = 0; i < topNode; i++) {
    D[i] = Number.MAX_VALUE;
    P[i] = null;

    // Set visualization tag for each node to infinity
    setTag(i, "∞");
  }

  // Set the distance for the source node to 0
  D[source] = 0;
  setTag(source, "0");

  // Main loop: relax edges (cntNodes - 1) times
  for (let i = 0; i < cntNodes - 1; i++) {
    let hasRelaxed = false;
    for (let j = 0; j < edges.length; j++) {
      const { u, v, w } = edges[j];

      // Visualization: highlight the edge being processed
      setFocusCodeLine();
      await delay(delayTime / 5);
      vizEdge(u, v, "red", isDirected);

      // Check and relax the edge if possible
      hasRelaxed |= await checkEdge(u, v, w);
      if (!isDirected) hasRelaxed |= await checkEdge(v, u, w);

      // Visualization: update the edge and nodes based on relaxation
      await delay(delayTime);
      if (P[v] === u || (!isDirected && P[u] === v)) {
        vizNode(u, "blue");
        vizNode(v, "blue");
        vizEdge(u, v, "blue", isDirected);
      } else vizEdge(u, v, "black", isDirected);
    }
    if (!hasRelaxed) break;
  }

  // Check for negative-weight cycles
  for (let i = 0; i < edges.length; i++) {
    const { u, v, w } = edges[i];
    if (D[u] + w < D[v] || (!isDirected && D[v] + w < D[u])) {
      hasNegaCycle();

      // Visualization: log and highlight the presence of a negative cycle
      setFocusCodeLine(9);
      printLog(`Le graphe contient un cycle de poids négatif`);
      break;
    }
  }

  // Mark the algorithm as finished
  setIsPlaying(false);

  /**
   * Checks and relaxes an edge if possible.
   *
   * @param {number} u - The starting node of the edge.
   * @param {number} v - The ending node of the edge.
   * @param {number} w - The weight of the edge.
   * @returns {Promise<boolean>} - True if the edge was relaxed, otherwise false.
   */
  async function checkEdge(u, v, w) {
    if (D[u] + w < D[v]) {
      // Visualization: reset the previous edge color
      vizEdge(P[v], v, "black", isDirected);

      // Relax the edge by updating distance and parent
      D[v] = D[u] + w;
      P[v] = u;

      // Visualization: update the tags and colors for the nodes and edge
      setTag(v, D[v]);
      vizNode(u, "green");
      vizNode(v, "green");
      vizEdge(u, v, "green", isDirected);
      printLog(
        `Distance relaxée du sommet ${v} avec l'arête ${u}->${v} : Nouvelle distance D(${v}) = ${D[v]}`
      );
      setFocusCodeLine(6);
      return true;
    }
    return false;
  }

  // Log the completion of the algorithm
  printLog("done");
}

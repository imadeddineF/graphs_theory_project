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
  const topNode = graphData.topNode; // Number of nodes in the graph.
  const isDirected = graphData.isDirected; // Whether the graph is directed.

  // Convert the edges to an array of objects with numerical values for u, v, and w.
  const edges = Object.values(graphData.edges).map(({ u, v, w }) => {
    return { u: Number(u), v: Number(v), w: Number(w) };
  });

  // Initial delay before starting the algorithm.
  await delay(50);
  printLog("L'algorithme de Kruskal: ");

  // Visualize all edges initially as transparent.
  edges.forEach((edge) => {
    vizEdge(edge.u, edge.v, "transparent", isDirected);
  });

  const size = []; // Sizes of components for union-find.
  const P = []; // Parents of nodes for union-find.

  // Initialize the parent array where each node is its own parent.
  for (let i = 0; i < topNode; i++) {
    P.push(i);
  }

  // Sort the edges by their weight in ascending order.
  edges.sort((firstEdge, secondEdge) => firstEdge.w - secondEdge.w);
  let totalWeight = 0; // Total weight of the minimum spanning tree.
  let components = Object.keys(graphData.nodes).length; // Number of components in the graph.

  // Iterate through each edge to construct the minimum spanning tree.
  for (let i = 0; i < edges.length; i++) {
    const { u, v, w } = edges[i];

    // Visualization and delay for each edge inspection.
    setFocusCodeLine();
    await delay(delayTime / 5);

    // Check if the nodes u and v are already connected.
    if (find(u) === find(v)) {
      // If they are connected, visualize the edge in red and log the information.
      vizEdge(u, v, "red", isDirected);
      printLog(`${u} et ${v} sont déjà connectés`);
      await delay(delayTime);
      vizEdge(u, v, "transparent", isDirected);
    } else {
      // If they are not connected, include this edge in the MST.
      totalWeight += w;
      components--;

      // Visualize the nodes and edge in blue and log the connection.
      vizNode(u, "blue");
      vizNode(v, "blue");
      vizEdge(u, v, "blue", isDirected);
      printLog(`Join ${u} and ${v}`);
      setFocusCodeLine(5);
      await delay(delayTime);
    }
    union(find(u), find(v)); // Union the components containing u and v.
  }

  // Log the final result of the algorithm.
  if (components > 1) {
    printLog(
      `Forêt couvrante minimale trouvée : Poids total = ${totalWeight} -> Nombre d'arbres = ${components}`
    );
  } else {
    printLog(`Arbre couvrant minimal trouvé : Poids total = ${totalWeight}`);
  }
  printLog("done");
  setIsPlaying(false); // Set the playing state to false indicating completion.

  /**
   * Finds the root of the component containing node u.
   *
   * @param {number} u - The node to find the root of.
   * @returns {number} - The root of the component containing node u.
   */
  function find(u) {
    if (P[u] === u) return u;
    return (P[u] = find(P[u])); // Path compression for efficiency.
  }

  /**
   * Unites the components containing nodes u and v.
   *
   * @param {number} u - The first node.
   * @param {number} v - The second node.
   */
  function union(u, v) {
    if (P[u] === P[v]) return;
    if (size[u] < size[v]) [u, v] = [v, u];
    P[v] = u;
    size[u] += size[v]; // Union by size for efficiency.
  }
}

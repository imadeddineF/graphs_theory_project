import { delay, getAdj } from "../Extra/Extra";

/**
 * Performs Depth-First Search (DFS) algorithm on a graph.
 *
 * @param {object} graphData - The graph data containing topNode, edges, and isDirected.
 * @param {number} source - The source node for DFS.
 * @param {function} vizNode - The visualization function for nodes.
 * @param {function} vizEdge - The visualization function for edges.
 * @param {function} setFocusCodeLine - The function to set the focus code line.
 * @param {number} delayTime - The delay time for visualization.
 * @param {function} setIsPlaying - The function to set the playing state.
 * @param {function} printLog - The function to print logs.
 * @returns {Promise<void>} - A promise that resolves when the DFS algorithm is completed.
 */
export async function Dfs(
  graphData,
  source,
  vizNode,
  vizEdge,
  setFocusCodeLine,
  delayTime,
  setIsPlaying,
  printLog
  // setTag
) {
  const topNode = graphData.topNode;
  const edges = Object.values(graphData.edges);
  const isDirected = graphData.isDirected;
  const adj = getAdj(topNode, edges, isDirected, false);

  // DFS starts here
  await delay(50);
  printLog("Recherche en profondeur:");

  const visit = []; // Visited array to keep track of visited nodes
  for (let i = 0; i < topNode; i++) {
    visit.push(false);
  }
  printLog(`Commencer au Sommet ${source}`);
  DfsCall(source, -1);

  /**
   * Performs a Depth-First Search (DFS) traversal starting from a given vertex.
   *
   * @param {number} u - The starting vertex for the DFS traversal.
   * @param {number} parent - The parent vertex of the current vertex.
   * @returns {Promise<void>} - A promise that resolves when the DFS traversal is complete.
   */
  async function DfsCall(u, parent) {
    if (visit[u]) {
      return;
    }
    visit[u] = true;

    // Visualization
    printLog(`Sommet ${u} Visité`);
    vizEdge(parent, u, "blue", isDirected);
    vizNode(u, "yellow");
    setFocusCodeLine(5);
    await delay(delayTime);
    vizNode(u, "blue");
    setFocusCodeLine();
    await delay(delayTime / 5);

    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];
      if (v === parent) continue;
      if (visit[v]) {
        // Visualization for already visited nodes
        vizEdge(u, v, "red", isDirected);
        setFocusCodeLine(3);
        await delay(delayTime);
        vizEdge(u, v, "black", isDirected);
      }

      // Visualization for recursive DFS call
      setFocusCodeLine(7);
      await delay(delayTime / 5);
      await DfsCall(v, u);
    }
    // Done
    // if (visit === true) {
    //   printLog("done");
    // }
  }
  setIsPlaying(false);
}

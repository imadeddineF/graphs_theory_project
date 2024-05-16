import { delay, getAdj } from "../Extra/Extra";

export async function Topsort(
  graphData,
  vizNode,
  vizEdge,
  setFocusCodeLine,
  delayTime,
  setIsPlaying,
  printLog,
  setTag,
  isNotDag
) {
  const topNode = graphData.topNode;
  const edges = Object.values(graphData.edges);
  const isDirected = graphData.isDirected;
  const adj = getAdj(topNode, edges, isDirected, false);

  // Topsort starts here
  await delay(50);
  printLog("Tri topologique:");

  const color = []; // Visited
  const topSort = [];
  let stop = false;
  let time = Object.keys(graphData.nodes).length - 1;
  for (let i = 0; i < topNode; i++) {
    color.push(0);
  }
  color[0] = 0;

  for (let i = 0; i < topNode; i++) {
    if (Object.prototype.hasOwnProperty.call(graphData.nodes, i))
      await DfsCall(i);
  }

  /**
   * Performs a depth-first search (DFS) traversal on a graph starting from a given node.
   * This function is used to perform a topological sort on a directed acyclic graph (DAG).
   *
   * @param {number} u - The current node being visited.
   * @param {number} parent - The parent node of the current node.
   * @returns {Promise<void>} - A promise that resolves when the DFS traversal is complete.
   */

  async function DfsCall(u, parent) {
    if (stop) return;
    if (color[u] === 2) {
      return;
    }
    if (color[u] === 1) {
      stop = true;

      //Visualization
      isNotDag();
      printLog("Le graphe n'est pas un DAG");
      printLog("Tri topologique non possible");
      vizEdge(parent, u, "red", isDirected);
      setFocusCodeLine(6);
      return;
    }
    color[u] = 1;

    //Visualization
    printLog(`Marque temporaire sur ${u}`);
    vizNode(u, "green");
    vizEdge(parent, u, "green", isDirected);
    setFocusCodeLine(8);
    await delay(delayTime);

    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];

      if (color[v] === 2) {
        //Visualization
        vizEdge(u, v, "red", isDirected);
        setFocusCodeLine(4);
        await delay(delayTime);
        vizEdge(u, v, "black", isDirected);
      }
      //Visualization
      setFocusCodeLine(10);
      await delay(delayTime / 5);

      await DfsCall(v, u);
      if (stop) return;
    }
    color[u] = 2;
    topSort.unshift(u);

    //Visualization
    setTag(u, time--);
    printLog(`Marque permanente sur ${u}`);
    printLog(`Tri topologique actuel : ${topSort}`);
    vizNode(u, "blue");
    vizEdge(parent, u, "blue", isDirected);
    setFocusCodeLine(11);
    await delay(delayTime);
    setFocusCodeLine();
    await delay(delayTime / 5);
  }
  if (!stop) {
    printLog(`Tri topologique final : ${topSort} (Un tri possible)`);
    printLog("done");
  }
  setIsPlaying(false);
}

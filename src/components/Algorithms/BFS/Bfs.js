import { delay, getAdj } from "../Extra/Extra";

/**
 * Performs Breadth-First Search (BFS) algorithm on a graph.
 *
 * @param {object} graphData - The graph data containing topNode, edges, isDirected, and isWeighted.
 * @param {number} source - The source node for BFS.
 * @param {function} vizNode - The visualization function for nodes.
 * @param {function} vizEdge - The visualization function for edges.
 * @param {function} setFocusCodeLine - The function to set the focus code line.
 * @param {number} delayTime - The delay time for visualization.
 * @param {function} setIsPlaying - The function to set the playing state.
 * @param {function} printLog - The function to print logs.
 * @param {function} setTag - The function to set tags.
 * @returns {Promise<void>} - A promise that resolves when the BFS algorithm is completed.
 */

export async function Bfs(
  graphData,
  source,
  vizNode,
  vizEdge,
  setFocusCodeLine,
  delayTime,
  setIsPlaying,
  printLog,
  setTag
) {
  const topNode = graphData.topNode;
  const edges = Object.values(graphData.edges);
  const isDirected = graphData.isDirected;
  const isWeighted = graphData.isWeighted;
  const adj = getAdj(topNode, edges, isDirected, isWeighted);

  // BFS starts here
  await delay(50);
  printLog("Recherche en largeur:");

  const D = []; // Array of distances
  const Q = []; // Queue
  const P = []; // Parents

  // Initialize distances and parents, and set initial tags
  for (let i = 0; i < topNode; i++) {
    D.push(Number.MAX_VALUE);
    P.push(null);

    // Visualization
    setTag(i, "∞");
  }

  // Start BFS from the source node
  Q.push(source);
  D[source] = 0;

  // Visualization
  setTag(source, 0);
  printLog(
    `La distance minimale de ${source} vers ${source} ->  D[${source}] = ${D[source]}`
  );
  setFocusCodeLine(4);
  await delay(delayTime);

  // Main BFS loop
  while (Q.length > 0) {
    const u = Q[0];
    Q.shift();

    // Visualization
    vizNode(u, "yellow");
    setFocusCodeLine(6);
    await delay(delayTime);

    // Traverse all adjacent nodes
    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];
      if (P[u] === v) continue;

      // If the node v is not visited
      if (D[v] === Number.MAX_VALUE) {
        D[v] = D[u] + 1;
        P[v] = u;
        Q.push(v);

        // Visualization
        setTag(v, D[v]);
        printLog(
          `La distance minimale de  ${source} vers ${v} ->  D[${v}] = ${D[v]}`
        );
        vizEdge(u, v, "blue", isDirected);
        vizNode(v, "blue");
        setFocusCodeLine(9);
        await delay(delayTime);
        setFocusCodeLine();
        await delay(delayTime / 5);
      } else {
        // Visualization for already visited node
        vizEdge(u, v, "red", isDirected);
        setFocusCodeLine();
        await delay(delayTime);
        vizEdge(u, v, "black", isDirected);
      }
    }

    // Check if the queue is empty
    if (Q.length === 0) {
      printLog("done");
    }

    // Final visualization for the node
    vizNode(u, "blue");
    setFocusCodeLine();
    await delay(delayTime / 5);
  }

  // Set the playing state to false after completion
  setIsPlaying(false);
}

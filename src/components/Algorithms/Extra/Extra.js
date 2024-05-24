// Asynchronously delays the execution for a specified number of milliseconds.
export async function delay(ms) {
  // Returns a promise that resolves after a delay of 'ms' milliseconds.
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * Generates an adjacency list representation of a graph based on the given parameters.
 *
 * @param {number} topNode - The number of nodes in the graph.
 * @param {Array} edges - An array of edges in the graph.
 * @param {boolean} isDirected - Indicates whether the graph is directed or not.
 * @param {boolean} isWeighted - Indicates whether the graph is weighted or not.
 * @returns {Array} - The adjacency list representation of the graph.
 */
export function getAdj(topNode, edges, isDirected, isWeighted) {
  // Initialize an empty adjacency list for each node.
  const adj = [];
  for (let i = 0; i < topNode; i++) {
    adj.push([]);
  }

  // If the graph is weighted, each edge has a weight associated with it.
  if (isWeighted) {
    edges.forEach(({ u, v, w }) => {
      // Add the edge with weight to the adjacency list of node u.
      adj[Number(u)].push({ v: Number(v), w: Number(w) });
      // If the graph is undirected, add the edge in the opposite direction as well.
      if (!isDirected) adj[Number(v)].push({ v: Number(u), w: Number(w) });
    });
  } else {
    // If the graph is unweighted, each edge only connects two nodes without any weight.
    edges.forEach(({ u, v }) => {
      // Add the edge to the adjacency list of node u.
      adj[Number(u)].push(Number(v));
      // If the graph is undirected, add the edge in the opposite direction as well.
      if (!isDirected) adj[Number(v)].push(Number(u));
    });
  }

  // Return the constructed adjacency list.
  return adj;
}

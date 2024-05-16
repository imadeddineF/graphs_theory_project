export async function delay(ms) {
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
  const adj = [];
  for (let i = 0; i < topNode; i++) {
    adj.push([]);
  }
  if (isWeighted) {
    edges.forEach(({ u, v, w }) => {
      adj[Number(u)].push({ v: Number(v), w: Number(w) });
      if (!isDirected) adj[Number(v)].push({ v: Number(u), w: Number(w) });
    });
  } else {
    edges.forEach(({ u, v }) => {
      adj[Number(u)].push(Number(v));
      if (!isDirected) adj[Number(v)].push(Number(u));
    });
  }
  return adj;
}

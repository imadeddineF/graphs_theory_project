/**
 * Class representing an element in the priority queue for Dijkstra's algorithm.
 */
class QElement {
  /**
   * Creates an instance of QElement.
   * @param {number} id - The node ID.
   * @param {number} distance - The distance of the node from the source.
   */
  constructor(id, distance) {
    this.id = id;
    this.distance = distance;
  }
}

/**
 * Class representing a priority queue used in Dijkstra's algorithm.
 */
class PriorityQueue {
  /**
   * Creates an instance of PriorityQueue.
   */
  constructor() {
    this.items = [];
  }

  /**
   * Enqueues an element into the priority queue based on its distance.
   * @param {number} id - The node ID.
   * @param {number} distance - The distance of the node from the source.
   */
  enqueue(id, distance) {
    let qElement = new QElement(id, distance);
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].distance > qElement.distance) {
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(qElement);
    }
  }

  /**
   * Removes and returns the element with the lowest distance from the priority queue.
   * @returns {QElement} The element with the lowest distance.
   */
  pop() {
    return this.items.shift();
  }

  /**
   * Returns the element with the lowest distance without removing it from the queue.
   * @returns {QElement} The element with the lowest distance.
   */
  front() {
    return this.items[0];
  }

  /**
   * Checks if the priority queue is empty.
   * @returns {boolean} True if the queue is empty, false otherwise.
   */
  isEmpty() {
    return this.items.length === 0;
  }
}

import { delay, getAdj } from "../Extra/Extra";

/**
 * Runs the Dijkstra's algorithm on a given graph to find the shortest path from a source node to all other nodes.
 *
 * @param {object} graphData - The graph data containing information about nodes, edges, and graph properties.
 * @param {number} source - The source node from which to find the shortest paths.
 * @param {function} vizNode - A function to visualize node changes during the algorithm execution.
 * @param {function} vizEdge - A function to visualize edge changes during the algorithm execution.
 * @param {function} setFocusCodeLine - A function to set the focus on a specific line of code during visualization.
 * @param {number} delayTime - The delay time (in milliseconds) between each step of the algorithm execution.
 * @param {function} setIsPlaying - A function to control the playing state of the algorithm.
 * @param {function} printLog - A function to print log messages during the algorithm execution.
 * @param {function} setTag - A function to set tags on nodes during the algorithm execution.
 * @returns {Promise<void>} - A promise that resolves when the algorithm execution is complete.
 */
export async function Dijkstra(
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

  // Dijkstra starts here
  await delay(50);
  printLog("L'algorithme de Dijkstra:");

  const D = []; // Array of distances
  const Q = new PriorityQueue(); // Priority queue
  const P = []; // Parents
  for (let i = 0; i < topNode; i++) {
    D.push(Number.MAX_VALUE);
    P.push(null);

    // Visualization
    setTag(i, "∞");
  }

  Q.enqueue(source, 0);
  D[source] = 0;

  // Visualization
  setTag(source, 0);
  setFocusCodeLine(4);
  await delay(delayTime);

  while (!Q.isEmpty()) {
    const { id: u, distance: qDistance } = Q.front();
    Q.pop();
    if (qDistance > D[u]) continue;

    // Visualization
    printLog(
      `La distance minimale trouvée de ${source} à ${u} -> D[${u}] = ${D[u]}`
    );
    vizEdge(P[u], u, "blue", isDirected);
    vizNode(u, "yellow");
    setFocusCodeLine(6);
    await delay(delayTime);

    for (let i = 0; i < adj[u].length; i++) {
      const { v, w } = adj[u][i];

      if (P[u] === v) continue;

      if (D[u] + w < D[v]) {
        D[v] = D[u] + w;
        P[v] = u;
        Q.enqueue(v, D[v]);

        // Visualization code
        setTag(v, D[v]);
        printLog(
          `Distance relaxée du sommet ${v} avec le sommet ${u} : Nouvelle distance ${D[v]}`
        );
        vizEdge(u, v, "green", isDirected);
        vizNode(v, "green");
        setFocusCodeLine(10);
        await delay(delayTime);
        vizNode(v, "white");
        setFocusCodeLine();
        await delay(delayTime / 5);
        vizEdge(u, v, "black", isDirected);
      } else {
        // Visualization code
        vizEdge(u, v, "red", isDirected);
        setFocusCodeLine();
        await delay(delayTime);
        vizEdge(u, v, "black", isDirected);
      }
    }
    // Visualization
    vizNode(u, "blue");
    setFocusCodeLine();
    await delay(delayTime / 5);
  }
  printLog("done");
  setIsPlaying(false);
}

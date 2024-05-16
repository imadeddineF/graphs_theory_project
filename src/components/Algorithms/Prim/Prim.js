class QElement {
  constructor(id, cost) {
    this.id = id;
    this.cost = cost;
  }
}
/**
 * Represents a priority queue.
 * @class
 */
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  /**
   * Adds an element to the priority queue.
   * @param {any} id - The identifier of the element.
   * @param {number} cost - The cost/priority of the element.
   */
  enqueue(id, cost) {
    let qElement = new QElement(id, cost);
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].cost > qElement.cost) {
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
   * Removes and returns the element with the highest priority from the queue.
   * @returns {QElement} The element with the highest priority.
   */
  pop() {
    return this.items.shift();
  }

  /**
   * Returns the element with the highest priority without removing it from the queue.
   * @returns {QElement} The element with the highest priority.
   */
  front() {
    return this.items[0];
  }

  /**
   * Checks if the priority queue is empty.
   * @returns {boolean} `true` if the queue is empty, `false` otherwise.
   */
  isEmpty() {
    return this.items.length === 0;
  }
}
import { delay, getAdj } from "../Extra/Extra";

export async function Prim(
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
  const isWeighted = graphData.isWeighted;
  const adj = getAdj(topNode, edges, isDirected, isWeighted);

  // Prim starts here
  await delay(50);
  printLog("L'algorithm de Prim:");

  edges.forEach((edge) => {
    vizEdge(edge.u, edge.v, "transparent", isDirected);
  });

  const cost = []; // Array of distances
  const Q = new PriorityQueue(); // Priority queue
  const P = []; // Parents
  const contains = [];
  let totalWeight = 0;
  for (let i = 0; i < topNode; i++) {
    cost.push(Number.MAX_VALUE);
    P.push(null);
    contains.push(false);
  }

  Q.enqueue(source, 0);
  cost[source] = 0;

  while (!Q.isEmpty()) {
    const { id: u, cost: currentCost } = Q.front();
    Q.pop();
    if (contains[u]) continue;
    contains[u] = true;
    totalWeight += currentCost;

    //Visualization
    setFocusCodeLine();
    await delay(delayTime / 5);
    vizNode(u, "blue");
    vizEdge(P[u], u, "blue");
    printLog(`Ajouter ${u} à l'arbre couvrant`);
    setFocusCodeLine(9);
    await delay(delayTime);

    for (let i = 0; i < adj[u].length; i++) {
      const { v, w } = adj[u][i];
      if (!contains[v] && cost[v] > w) {
        cost[v] = w;
        P[v] = u;
        Q.enqueue(v, w);
      }
    }
  }

  printLog(`Arbre couvrant minimal trouvé : Poids total = ${totalWeight}`);
  printLog("done");
  setIsPlaying(false);
}

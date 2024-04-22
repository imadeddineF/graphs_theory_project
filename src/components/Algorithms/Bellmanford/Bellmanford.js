import { delay } from "../Extra/Extra";

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
  const topNode = graphData.topNode;
  const isDirected = graphData.isDirected;
  const edges = Object.values(graphData.edges).map(({ u, v, w }) => {
    return { u: Number(u), v: Number(v), w: Number(w) };
  });

  // Bellmanford starts here
  await delay(50);
  printLog("L'algorithme de Bellman-Ford:");

  const D = []; // Distance
  const P = []; // Parents
  const cntNodes = Object.keys(graphData.nodes).length; // Number of nodes

  for (let i = 0; i < topNode; i++) {
    D[i] = Number.MAX_VALUE;
    P[i] = null;

    //Visualization
    setTag(i, "∞");
  }

  D[source] = 0;
  setTag(source, "0");

  for (let i = 0; i < cntNodes - 1; i++) {
    let hasRelaxed = false;
    for (let j = 0; j < edges.length; j++) {
      const { u, v, w } = edges[j];
      //Visualization
      setFocusCodeLine();
      await delay(delayTime / 5);
      vizEdge(u, v, "red", isDirected);

      hasRelaxed |= await checkEdge(u, v, w);
      if (!isDirected) hasRelaxed |= await checkEdge(v, u, w);

      //Visualization
      await delay(delayTime);
      if (P[v] === u || (!isDirected && P[u] === v)) {
        vizNode(u, "blue");
        vizNode(v, "blue");
        vizEdge(u, v, "blue", isDirected);
      } else vizEdge(u, v, "black", isDirected);
    }
    if (!hasRelaxed) break;
  }
  for (let i = 0; i < edges.length; i++) {
    const { u, v, w } = edges[i];
    if (D[u] + w < D[v] || (!isDirected && D[v] + w < D[u])) {
      hasNegaCycle();

      //Visualization
      setFocusCodeLine(9);
      printLog(`Le graphe contient un cycle de poids négatif`);
      break;
    }
  }
  setIsPlaying(false);

  async function checkEdge(u, v, w) {
    if (D[u] + w < D[v]) {
      //Visualization
      vizEdge(P[v], v, "black", isDirected);

      D[v] = D[u] + w;
      P[v] = u;

      //Visualization
      setTag(v, D[v]);
      vizNode(u, "green");
      vizNode(v, "green");
      vizEdge(u, v, "green", isDirected);
      printLog(
        `Distance relaxée du sommet ${v} avec l'arête  ${u}->${v} : Nouvelle distance D(${v}) = ${D[v]}`
      );
      setFocusCodeLine(6);
      return true;
    }
    return false;
  }
  printLog("done");
}

export default function DijkstraPseudocode({ focusCodeLine }) {
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? "#06121f" : "" };
  }
  return (
    <ul className="bg-primary3 w-full rounded-lg py-5 px-2 text-[14px] text-white flex flex-col gap-2">
      <li className="ml-2">
        <strong>for</strong> each vertex u &#8712; G:V &minus; &#123;s&#125;
      </li>
      <li className="ml-6">d[u] = &infin;</li>
      <li className="ml-2">d[s] = 0</li>
      <li className="ml-2" style={highlight(4)}>
        ENQUEUE(Q,s)
      </li>
      <li className="ml-2">
        <strong>while</strong> (Q not empty)
      </li>
      <li className="ml-6" style={highlight(6)}>
        u ← vertex in Q with min dist[u]
      </li>
      <li className="ml-6">remove u from Q</li>
      <li className="ml-6">
        <strong>for</strong> each v &#8712; G.Adj[u]
      </li>
      <li className="ml-10">
        <strong>if</strong> ( d[u] + w[u][v] &#60; d[v] )
      </li>
      <li className="ml-14" style={highlight(10)}>
        d[v] = d[u] + w[u][v]
      </li>
      <li className="ml-14" style={highlight(10)}>
        ENQUEUE(Q,v)
      </li>
    </ul>
  );
}

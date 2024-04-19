export default function BfsPseudocode({ focusCodeLine }) {
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? "#06121f" : "" };
  }
  return (
    <ul className="bg-primary4 w-full rounded-lg py-5 px-2 text-[14px] text-white flex flex-col gap-2">
      <li className="ml-2">Recursive Dfs: Call DFS(s)</li>
      <li className="ml-2">
        <strong>function</strong> DFS(u) &#123;
      </li>
      <li className="ml-6" style={highlight(3)}>
        <strong>if</strong> ( u is visited )
      </li>
      <li className="ml-10" style={highlight(3)}>
        <strong>return</strong>
      </li>
      <li className="ml-6" style={highlight(5)}>
        visit[u] = 1
      </li>
      <li className="ml-6">
        <strong>for</strong> each v &#8712; G.Adj[u]
      </li>
      <li className="ml-10" style={highlight(7)}>
        DFS(v)
      </li>
      <li className="ml-2">&#125;</li>
    </ul>
  );
}

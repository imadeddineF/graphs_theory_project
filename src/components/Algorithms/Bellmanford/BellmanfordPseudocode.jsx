export default function BfsPseudocode({ focusCodeLine }) {
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? "#06121f" : "" };
  }
  return (
    <ul className="bg-primary3 w-[60%] rounded-lg py-8 px-8 text-white flex flex-col gap-2">
      <li className="ml-2">
        <strong>for</strong> each vertex u &#8712; G:V &minus; &#123;s&#125;
      </li>
      <li className="ml-6">d[u] = &infin;</li>
      <li className="ml-2">d[s] = 0</li>
      <li className="ml-2">
        <strong>repeat</strong> |V|-1 <strong>times:</strong>
      </li>
      <li className="ml-6">
        <strong>for</strong> each edge (u,v,w)
      </li>
      <li className="ml-10" style={highlight(6)}>
        <strong>if</strong> ( d[u] + w &#60; d[v] )
      </li>
      <li className="ml-14" style={highlight(6)}>
        d[v] = d[u] + w
      </li>
      <li className="ml-2">
        <strong>for</strong> each edge (u,v,w)
      </li>
      <li className="ml-6" style={highlight(9)}>
        <strong>if</strong> ( d[u] + w &#60; d[v] )
      </li>
      <li className="ml-10" style={highlight(9)}>
        <strong>Negative-weight cycle</strong>
      </li>
    </ul>
  );
}

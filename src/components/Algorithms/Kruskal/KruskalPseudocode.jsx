export default function KruskalPseudocode({ focusCodeLine }) {
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? "#06121f" : "" };
  }
  return (
    <ul className="bg-primary4 w-full rounded-lg py-5 px-2 text-[14px] text-white flex flex-col gap-2">
      <li className="ml-2">
        <strong>for</strong> each vertex u &#8712; G:V &minus; &#123;s&#125;
      </li>
      <li className="ml-6">MAKE-SET(v)</li>
      <li className="ml-2">
        <strong>sort</strong> edges by <strong>weight</strong>
      </li>
      <li className="ml-2">
        <strong>for</strong> each edge (u,v)
      </li>
      <li className="ml-6" style={highlight(5)}>
        <strong>if </strong> FIND(u) ≠ FIND(v)
      </li>
      <li className="ml-10" style={highlight(5)}>
        UNION(SET(u), SET(v))
      </li>
    </ul>
  );
}

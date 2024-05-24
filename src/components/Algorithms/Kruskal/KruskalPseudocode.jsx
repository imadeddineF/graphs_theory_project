/* eslint-disable react/prop-types */
/**
 * Renders the pseudocode for the Kruskal's algorithm.
 * @param {Object} props - The component props.
 * @param {number} props.focusCodeLine - The line number to highlight in the pseudocode.
 * @returns {JSX.Element} The rendered pseudocode component.
 */

export default function KruskalPseudocode({ focusCodeLine }) {
  /**
   * Highlights a specific line in the pseudocode if it matches the focus code line.
   * @param {number} id - The line number to check for highlighting.
   * @returns {Object} The style object for the line.
   */
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? "#06121f" : "" };
  }

  return (
    <ul className="bg-pseudocode w-[60%] rounded-lg py-8 px-8 text-white flex flex-col gap-2">
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

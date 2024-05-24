/* eslint-disable react/prop-types */
/**
 * Renders the pseudocode for the Breadth-First Search (BFS) algorithm.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.focusCodeLine - The line number to highlight in the pseudocode.
 * @returns {JSX.Element} The rendered JSX element representing the pseudocode.
 */

export default function BfsPseudocode({ focusCodeLine }) {
  /**
   * Highlights a specific line in the pseudocode.
   *
   * @param {number} id - The line number to highlight.
   * @returns {Object} - The style object with backgroundColor set if the line is highlighted.
   */
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? "#06121f" : "" };
  }

  return (
    <ul className="bg-pseudocode w-[60%] rounded-lg py-8 px-8 text-white flex flex-col gap-2">
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
        u = DEQUEUE(Q)
      </li>
      <li className="ml-6">
        <strong>for</strong> each v &#8712; G.Adj[u]
      </li>
      <li className="ml-10">
        <strong>if</strong> (d[v] == &infin;)
      </li>
      <li className="ml-14" style={highlight(9)}>
        d[v] = d[u] + 1
      </li>
      <li className="ml-14" style={highlight(9)}>
        ENQUEUE(Q,v)
      </li>
    </ul>
  );
}

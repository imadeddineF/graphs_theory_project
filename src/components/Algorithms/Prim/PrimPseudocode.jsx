/* eslint-disable react/prop-types */
/**
 * Renders the pseudocode for the Prim's algorithm.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.focusCodeLine - The line number to highlight in the pseudocode.
 * @returns {JSX.Element} The PrimPseudocode component.
 */

export default function PrimPseudocode({ focusCodeLine }) {
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
      <li className="ml-6">cost[u] = &infin;</li>
      <li className="ml-2">cost[s] = 0</li>
      <li className="ml-2">ENQUEUE(Q,s)</li>
      <li className="ml-2">
        <strong>while</strong> (Q not empty)
      </li>
      <li className="ml-6">u ← vertex in Q with min cost[u]</li>
      <li className="ml-6">remove u from Q</li>
      <li className="ml-6">
        <strong>if</strong> node u is not in tree
      </li>
      <li className="ml-10" style={highlight(9)}>
        <strong>add</strong> node u to tree
      </li>
      <li className="ml-10">
        <strong>for</strong> each v &#8712; G.Adj[u]
      </li>
      <li className="ml-14">
        <strong>if</strong> ( cost[v] &#60; w[u][v] )
      </li>
      <li className="tab5">cost[v] = w[u][v]</li>
      <li className="tab5">ENQUEUE(Q,v)</li>
    </ul>
  );
}
